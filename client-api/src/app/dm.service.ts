import httpStatus from 'http-status';

import prisma from '../prisma/prisma.ts';
import HttpException from '../utils/http-exception.ts';
import ws from '../server-ws.ts';

const dm_GET = async ({
  receiverUserId,
  userId,
}: {
  receiverUserId: number;
  userId: number;
}) => {
  const receiver = await prisma.user.count({
    where: { id: receiverUserId },
  });

  if (!receiver)
    throw new HttpException({
      errors: { receiverUserId: 'NOT_FOUND' },
      status: httpStatus.UNPROCESSABLE_ENTITY,
    });

  return await prisma.dm.findMany({
    orderBy: {
      createdAt: 'asc',
    },
    where: {
      OR: [
        { receiverUserId, userId },
        { receiverUserId: userId, userId: receiverUserId },
      ],
    },
  });
};

const dm_POST = async ({
  message,
  receiverUserId,
  userId,
}: {
  message: string;
  receiverUserId: number;
  userId: number;
}) => {
  const receiver = await prisma.user.count({
    where: { id: receiverUserId },
  });

  if (!receiver)
    throw new HttpException({
      errors: { receiverUserId: 'NOT_FOUND' },
      status: httpStatus.UNPROCESSABLE_ENTITY,
    });

  const dm = await prisma.dm.create({
    data: { message, receiverUserId, userId },
  });

  ws.notifyMessage(dm, receiverUserId);
  ws.notifyMessage(dm, userId);
};

export default { dm_GET, dm_POST };
