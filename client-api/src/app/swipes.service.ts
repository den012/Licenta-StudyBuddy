import httpStatus from 'http-status';

import prisma from '../prisma/prisma.ts';
import HttpException from '../utils/http-exception.ts';
import ws from '../server-ws.ts';

const swipes_POST = async ({
  swipedUserId,
  type,
  userId,
}: {
  swipedUserId: number;
  type: 'LIKE' | 'SKIP';
  userId: number;
}) => {
  if (swipedUserId === userId)
    throw new HttpException({
      errors: { swipedUserId: 'NICE_TRY_BUT_NO' },
      status: httpStatus.UNPROCESSABLE_ENTITY,
    });

  const swipedUser = await prisma.user.findUnique({
    select: {
      id: true,
    },
    where: { id: swipedUserId },
  });

  if (!swipedUser)
    throw new HttpException({
      errors: { swipedUserId: 'NOT_FOUND' },
      status: httpStatus.UNPROCESSABLE_ENTITY,
    });

  const user = await prisma.user.findUnique({
    select: {
      id: true,
    },
    where: { id: userId },
  });

  if (!user)
    throw new HttpException({
      errors: { userId: 'NOT_FOUND' },
      status: httpStatus.UNPROCESSABLE_ENTITY,
    });

  /**/

  await prisma.$transaction(async (tx) => {
    await tx.userSwipe.deleteMany({ where: { swipedUserId, userId } });

    await tx.userSwipe.create({ data: { swipedUserId, type, userId } });
  });

  if (type === 'SKIP') return { isMatch: false };

  const matches = await prisma.userSwipe.count({
    where: {
      OR: [
        { swipedUserId, userId, type: 'LIKE' },
        { swipedUserId: userId, userId: swipedUserId, type: 'LIKE' },
      ],
    },
  });

  const isMatch = matches === 2;

  if (isMatch) ws.notifyMatch(swipedUserId, userId);

  return { isMatch };
};

const swipesMatches_GET = async ({
  seenAt,
  userId,
}: {
  seenAt?: boolean;
  userId: number;
}) => {
  const userLike = await prisma.userSwipe.findMany({
    select: {
      swipedUserId: true,
    },
    where: { type: 'LIKE', userId },
  });

  const swipedUserLike = await prisma.userSwipe.findMany({
    select: {
      userId: true,
    },
    where: {
      seenAt: seenAt ? null : undefined,
      swipedUserId: userId,
      type: 'LIKE',
      userId: { in: userLike.map(({ swipedUserId }) => swipedUserId) },
    },
  });

  const matches = swipedUserLike.map(({ userId }) => userId);

  if (seenAt) return matches.length;

  if (matches.length === 0) return [];

  return await prisma.user.findMany({
    select: {
      avatar: true,
      bio: true,
      id: true,
      name: true,
      yob: true,
      //
      xUserSkill: {
        select: {
          skill: {
            select: { title: true },
          },
          type: true,
        },
      },
    },
    where: { id: { in: matches } },
  });
};

const swipesMatchesUnread_GET = async ({ userId }: { userId: number }) => {
  return await swipesMatches_GET({ seenAt: true, userId });
};

const swipesMatchesUnread_POST = async ({ userId }: { userId: number }) => {
  await prisma.userSwipe.updateMany({
    data: {
      seenAt: new Date(),
    },
    where: {
      seenAt: null,
      swipedUserId: userId,
      type: 'LIKE',
    },
  });
};

export default {
  swipes_POST,
  swipesMatches_GET,
  swipesMatchesUnread_GET,
  swipesMatchesUnread_POST,
};
