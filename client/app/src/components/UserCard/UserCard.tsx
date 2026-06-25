import React, { useState } from 'react';

import { dicebearAvatarUrl } from '../../lib/avatarUrl';
import { splitSkillTitles } from '../../lib/userSkills';
import type { UserCardUser } from '../../types/feedUser';

import { UserCardStyle } from './UserCardStyle';

export interface UserCardProps {
  user: UserCardUser;
  action?: React.ReactNode;
}

const UserCard: React.FC<UserCardProps> = ({ user, action }) => {
  const [avatarError, setAvatarError] = useState(false);
  const avatarSrc =
    user.avatar && !avatarError ? user.avatar : dicebearAvatarUrl(user.id);

  const { know: knowSkills, wantToLearn: wantToLearnSkills } =
    splitSkillTitles(user.xUserSkill ?? undefined);

  return (
    <li className={UserCardStyle.listItem}>
      <div className={UserCardStyle.row}>
        <div className={UserCardStyle.avatarWrap}>
          <img
            src={avatarSrc}
            alt={user.name ?? 'User'}
            className={UserCardStyle.avatarImg}
            referrerPolicy="no-referrer"
            onError={() => setAvatarError(true)}
          />
        </div>
        <div className={UserCardStyle.body}>
          <h2 className={UserCardStyle.name}>{user.name ?? 'Anonymous'}</h2>
          {user.bio ? (
            <p className={UserCardStyle.bio}>{user.bio}</p>
          ) : null}
          {knowSkills.length > 0 && (
            <p className={UserCardStyle.skillsLine}>
              <span className={UserCardStyle.skillsLabel}>Knows:</span>{' '}
              {knowSkills.slice(0, 3).join(', ')}
              {knowSkills.length > 3 && '…'}
            </p>
          )}
          {wantToLearnSkills.length > 0 && (
            <p className={UserCardStyle.skillsLineTight}>
              <span className={UserCardStyle.skillsLabel}>
                Wants to learn:
              </span>{' '}
              {wantToLearnSkills.slice(0, 3).join(', ')}
              {wantToLearnSkills.length > 3 && '…'}
            </p>
          )}
        </div>
        {action}
      </div>
    </li>
  );
};

export default UserCard;
