export interface FeedUser {
  id: number;
  avatar: string | null;
  bio: string;
  name: string | null;
  yob: number | null;
  xUserSkill: UserSkillRow[];
}

export type UserSkillRow = {
  skill: { title: string };
  type: 'KNOW' | 'WANT_TO_LEARN';
};

export type UserCardUser = {
  id: number;
  name?: string | null;
  avatar?: string | null;
  bio?: string | null;
  yob?: number | null;
  xUserSkill?: UserSkillRow[] | null;
};
