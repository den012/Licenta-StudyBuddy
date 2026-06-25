import React from 'react';

import { HomePageStyle } from './HomePageStyle';

const FeedActionButtons: React.FC<{
  onLeftSwipe: () => void;
  onRightSwipe: () => void;
  disabled: boolean;
}> = ({ onLeftSwipe, onRightSwipe, disabled }) => (
  <div className={HomePageStyle.actionBar}>
    <button
      onClick={onLeftSwipe}
      disabled={disabled}
      className={HomePageStyle.swipePass}
      aria-label="Pass"
    >
      ✕
    </button>
    <button
      onClick={onRightSwipe}
      disabled={disabled}
      className={HomePageStyle.swipeLike}
      aria-label="Like"
    >
      ✓
    </button>
  </div>
);

export default FeedActionButtons;
