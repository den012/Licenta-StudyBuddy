import prisma from '../prisma/prisma.ts';

const skills_GET = async () => {
  return await prisma.skill.findMany({
    select: { id: true, title: true },
  });
};

const skills_POST = async ({ title }: { title: string }) => {
  const exists = await prisma.skill.findFirst({
    select: { id: true },
    where: { title },
  });

  if (exists) return { id: exists.id };

  const skill = await prisma.skill.create({
    data: { title },
    select: { id: true },
  });

  return { id: skill.id };
};

export default { skills_GET, skills_POST };
