import React from 'react';

import { HomePageStyle } from './HomePageStyle';

const FeedLoadingScreen: React.FC = () => (
  <div className={HomePageStyle.loadingScreen}>
    <div className={HomePageStyle.loadingText}>Loading...</div>
  </div>
);

export default FeedLoadingScreen;
