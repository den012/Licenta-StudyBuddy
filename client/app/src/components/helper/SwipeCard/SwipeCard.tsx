import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMotionValue, useTransform, type PanInfo } from 'framer-motion';

import { dicebearAvatarUrl } from '../../../lib/avatarUrl';
import { splitSkillTitles } from '../../../lib/userSkills';
import type { FeedUser } from '../../../types/feedUser';

import { SwipeCardStyle } from './SwipeCardStyle';

export const SWIPE_THRESHOLD = 100;

export type { FeedUser };
export type SwipeDirection = 'left' | 'right';

const SwipeCard: React.FC<{
  user: FeedUser;
  onSwipe: (direction: SwipeDirection) => void;
}> = ({ user, onSwipe }) => {
  const [avatarError, setAvatarError] = useState(false);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  const background = useTransform(
    x,
    [-100, 0, 100],
    ['#fee2e2', '#ffffff', '#dcfce7'],
  );
  const avatarSrc =
    user.avatar && !avatarError ? user.avatar : dicebearAvatarUrl(user.id);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ): void => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      onSwipe('right');
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      onSwipe('left');
    }
  };

  const { know: knowSkills, wantToLearn: wantToLearnSkills } =
    splitSkillTitles(user.xUserSkill);

  return (
    <motion.div
      style={{ x, rotate, opacity, backgroundColor: background }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className={SwipeCardStyle.card}
    >
      {(knowSkills.length > 0 || wantToLearnSkills.length > 0) && (
        <div className={SwipeCardStyle.skillsAbove}>
          {knowSkills.length > 0 && (
            <div className={SwipeCardStyle.tagRow}>
              {knowSkills.slice(0, 3).map((skill, i) => (
                <span key={i} className={SwipeCardStyle.tagKnow}>
                  {skill}
                </span>
              ))}
            </div>
          )}
          {wantToLearnSkills.length > 0 && (
            <div className={SwipeCardStyle.tagRow}>
              {wantToLearnSkills.slice(0, 3).map((skill, i) => (
                <span key={i} className={SwipeCardStyle.tagWant}>
                  Looking for: {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
      <div className={SwipeCardStyle.mediaWrap}>
        <img
          src={avatarSrc}
          alt={user.name ?? undefined}
          className={SwipeCardStyle.avatar}
          draggable={false}
          referrerPolicy="no-referrer"
          onError={() => setAvatarError(true)}
        />
      </div>

      <div className={SwipeCardStyle.body}>
        <div>
          <h2 className={SwipeCardStyle.name}>{user.name || 'Anonymous'}</h2>
          <p className={SwipeCardStyle.bio}>
            "{user.bio || 'Seeking a creative partner.'}"
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SwipeCard;
