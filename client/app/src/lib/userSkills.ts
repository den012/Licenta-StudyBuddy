import type { UserSkillRow } from '../types/feedUser';

export function splitSkillTitles(
  xUserSkill: UserSkillRow[] | null | undefined,
): { know: string[]; wantToLearn: string[] } {
  const know =
    xUserSkill?.filter((s) => s.type === 'KNOW').map((s) => s.skill.title) ??
    [];
  const wantToLearn =
    xUserSkill
      ?.filter((s) => s.type === 'WANT_TO_LEARN')
      .map((s) => s.skill.title) ?? [];
  return { know, wantToLearn };
}
