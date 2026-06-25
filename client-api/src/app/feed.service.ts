import prisma from '../prisma/prisma.ts';

const userSkillSelect = {
  select: {
    skillId: true,
    skill: { select: { title: true } },
    type: true,
  },
} as const;

const countMatches = (wanted: Set<number>, theirSkillIds: number[]): number => {
  let count = 0;
  for (const id of theirSkillIds) {
    if (wanted.has(id)) count++;
  }
  return count;
};

const feed_GET = async ({ userId }: { userId: number }) => {
  const swiped = await prisma.userSwipe.findMany({
    select: {
      swipedUserId: true,
    },
    where: { userId },
  });

  const me = await prisma.user.findUnique({
    where: { id: userId },
    select: { xUserSkill: userSkillSelect },
  });

  const iWantToLearn = new Set<number>();
  const iKnow = new Set<number>();
  for (const row of me?.xUserSkill ?? []) {
    if (row.type === 'WANT_TO_LEARN') iWantToLearn.add(row.skillId);
    else if (row.type === 'KNOW') iKnow.add(row.skillId);
  }

  const excludedIds = [userId, ...swiped.map(({ swipedUserId }) => swipedUserId)];

  const candidates = await prisma.user.findMany({
    select: {
      id: true,
      avatar: true,
      bio: true,
      name: true,
      yob: true,
      xUserSkill: userSkillSelect,
    },
    where: {
      id: { notIn: excludedIds },
    },
  });

  const theyKnow = (user: (typeof candidates)[number]): number[] =>
    user.xUserSkill.filter((x) => x.type === 'KNOW').map((x) => x.skillId);

  const theyWant = (user: (typeof candidates)[number]): number[] =>
    user.xUserSkill
      .filter((x) => x.type === 'WANT_TO_LEARN')
      .map((x) => x.skillId);

  return [...candidates].sort((a, b) => {
    const teachMeA = countMatches(iWantToLearn, theyKnow(a));
    const teachMeB = countMatches(iWantToLearn, theyKnow(b));
    if (teachMeB !== teachMeA) return teachMeB - teachMeA;

    const iTeachThemA = countMatches(iKnow, theyWant(a));
    const iTeachThemB = countMatches(iKnow, theyWant(b));
    if (iTeachThemB !== iTeachThemA) return iTeachThemB - iTeachThemA;

    return a.id - b.id;
  });
};

const feedReset_POST = async ({ userId }: { userId: number }) => {
  await prisma.userSwipe.deleteMany({ where: { userId } });

  await prisma.userSwipe.updateMany({
    data: {
      seenAt: null,
    },
    where: { swipedUserId: userId },
  });
};

export default { feed_GET, feedReset_POST };
