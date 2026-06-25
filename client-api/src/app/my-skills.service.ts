import type { UserSkillType } from '../prisma/generated/enums.ts';
import prisma from '../prisma/prisma.ts';

const mySkills_GET = async ({ userId }: { userId: number }) => {
  const skills = await prisma.userSkill.findMany({
    select: {
      skill: {
        select: { title: true },
      },
      type: true,
    },
    where: { userId },
  });

  const know = skills.filter(({ type }) => type === 'KNOW');

  const wantToLearn = skills.filter(({ type }) => type === 'WANT_TO_LEARN');

  return {
    know: know.map(({ skill }) => skill.title),
    wantToLearn: wantToLearn.map(({ skill }) => skill.title),
  };
};

const mySkills_PUT = async ({
  know,
  userId,
  wantToLearn,
}: {
  know: string[];
  userId: number;
  wantToLearn: string[];
}) => {
  const skills = await prisma.skill.findMany({
    select: { id: true, title: true },
    where: {
      title: { in: [...know, ...wantToLearn] },
    },
  });

  const skillsMap = new Map(skills.map((skill) => [skill.title, skill.id]));

  const data: { skillId: number; type: UserSkillType; userId: number }[] = [];

  for (const skillTitle of know) {
    const skillId = skillsMap.get(skillTitle);

    if (skillId) data.push({ skillId, type: 'KNOW', userId });
  }

  for (const skillTitle of wantToLearn) {
    const skillId = skillsMap.get(skillTitle);

    if (skillId) data.push({ skillId, type: 'WANT_TO_LEARN', userId });
  }

  await prisma.$transaction(async (tx) => {
    await tx.userSkill.deleteMany({ where: { userId } });

    await tx.userSkill.createMany({ data });
  });
};

export default { mySkills_GET, mySkills_PUT };
