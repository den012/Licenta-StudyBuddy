import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth0 } from '@auth0/auth0-react';

import { dicebearAvatarUrl } from '../../lib/avatarUrl';
import type { FeedUser } from '../../types/feedUser';

import { HomePageStyle } from './HomePageStyle';

export interface MatchOverlayProps {
  isOpen: boolean;
  matchedUser: FeedUser | null;
  onClose: () => void;
}

const MatchOverlay: React.FC<MatchOverlayProps> = ({
  isOpen,
  matchedUser,
  onClose,
}) => {
  const currentUser = useAuth0().user;
  const [currentAvatarError, setCurrentAvatarError] = useState(false);
  const [matchedAvatarError, setMatchedAvatarError] = useState(false);

  const currentAvatarSrc =
    currentUser?.picture && !currentAvatarError ? currentUser.picture : null;

  const matchedAvatarSrc =
    matchedUser?.avatar && !matchedAvatarError
      ? matchedUser.avatar
      : dicebearAvatarUrl(matchedUser?.id ?? 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={HomePageStyle.overlayBackdrop}
        >
          <div className={HomePageStyle.overlayWatermarkWrap}>
            <span className={HomePageStyle.overlayWatermark}>
              CONNECTION
            </span>
          </div>

          <div className={HomePageStyle.overlayContent}>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={HomePageStyle.matchKicker}
            >
              It's a
            </motion.h2>

            <motion.h1
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 100, delay: 0.3 }}
              className={HomePageStyle.matchTitle}
            >
              Match!
            </motion.h1>

            <div className={HomePageStyle.avatarsRow}>
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className={HomePageStyle.avatarYou}
              >
                {currentAvatarSrc ? (
                  <img
                    src={currentAvatarSrc}
                    alt="You"
                    className={HomePageStyle.avatarYouImg}
                    referrerPolicy="no-referrer"
                    onError={() => setCurrentAvatarError(true)}
                  />
                ) : (
                  <span>You</span>
                )}
              </motion.div>
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className={HomePageStyle.avatarMatch}
              >
                <img
                  src={matchedAvatarSrc}
                  alt={matchedUser?.name ?? 'Match'}
                  className={HomePageStyle.avatarMatchImg}
                  referrerPolicy="no-referrer"
                  onError={() => setMatchedAvatarError(true)}
                />
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className={HomePageStyle.matchCopy}
            >
              You and{' '}
              <span className={HomePageStyle.matchName}>
                {matchedUser?.name || 'someone'}
              </span>{' '}
              are ready to collaborate.
            </motion.p>

            <div className={HomePageStyle.matchActions}>
              <motion.button
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className={HomePageStyle.matchDismiss}
              >
                Keep Browsing
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MatchOverlay;
