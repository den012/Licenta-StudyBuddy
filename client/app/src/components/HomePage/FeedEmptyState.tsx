import React from 'react';
import { motion } from 'framer-motion';

import { HomePageStyle } from './HomePageStyle';

const FeedEmptyState: React.FC<{ onRefresh: () => void }> = ({
  onRefresh,
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className={HomePageStyle.emptyRoot}
  >
    <p className={HomePageStyle.emptyMessage}>No more matches today.</p>
    <button
      onClick={onRefresh}
      className={HomePageStyle.emptyRefresh}
    >
      Refresh
    </button>
  </motion.div>
);

export default FeedEmptyState;
