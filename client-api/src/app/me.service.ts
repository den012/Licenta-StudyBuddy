import httpStatus from 'http-status';

import prisma from '../prisma/prisma.ts';
import HttpException from '../utils/http-exception.ts';

const me_GET = async ({ userId }: { userId: number }) => {
  const user = await prisma.user.findUnique({
    select: {
      id: true,
      avatar: true,
      bio: true,
      name: true,
      yob: true,
    },
    where: { id: userId },
  });

  if (!user)
    throw new HttpException({
      errors: { user: 'NOT_FOUND' },
      status: httpStatus.NOT_FOUND,
    });

  return user;
};

const me_PATCH = async ({
  data,
  userId,
}: {
  data: { avatar?: string; bio?: string; name?: string; yob?: number };
  userId: number;
}) => {
  await prisma.user.update({ data, where: { id: userId } });
};

export default { me_GET, me_PATCH };
