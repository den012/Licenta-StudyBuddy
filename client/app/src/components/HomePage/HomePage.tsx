import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import axios from 'axios';

import SwipeCard, { type FeedUser, type SwipeDirection } from '../helper/SwipeCard';
import AppNav from '../helper/AppNav';

import FeedActionButtons from './FeedActionButtons';
import FeedEmptyState from './FeedEmptyState';
import FeedLoadingScreen from './FeedLoadingScreen';
import { HomePageStyle } from './HomePageStyle';
import MatchOverlay from './MatchOverlay';

const API_URL = import.meta.env.VITE_API_URL;

interface ApiResponse {
  data: FeedUser[];
  status: number;
  statusName: string;
}

const HomePage: React.FC = () => {
  const [cards, setCards] = useState<FeedUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showMatchOverlay, setShowMatchOverlay] = useState<boolean>(false);
  const [matchedUser, setMatchedUser] = useState<FeedUser | null>(null);

  const feedReset = async (): Promise<void> => {
    try {
      setLoading(true);
      await axios.post(`${API_URL}/feed-reset`);
      await fetchUsers();
    } catch (error) {
      console.error('Error resetting feed:', error);
    }
  };

  const fetchUsers = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await axios.get<ApiResponse>(`${API_URL}/feed`);
      console.log(response.data.data);
      setCards(response.data.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setCards([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSwipe = async (direction: SwipeDirection): Promise<void> => {
    console.log(`Swiped ${direction}`);
    if (cards.length > 0) {
      const swipedUser = cards[0];
      const swipedUserId = swipedUser.id;

      try {
        const response = await axios.post(`${API_URL}/swipes`, {
          type: direction === 'right' ? 'LIKE' : 'SKIP',
          swipedUserId,
        });

        console.log(response.data.data);
        setCards((prevCards) => prevCards.slice(1));

        if (response.data.data.isMatch) {
          console.log("It's a match!");
          setMatchedUser(swipedUser);
          setShowMatchOverlay(true);
          window.dispatchEvent(new CustomEvent('refetch-matches-badge'));
        }
      } catch (error) {
        console.error('Error swiping:', error);
      }
    }
  };

  const handleButtonClick = (direction: SwipeDirection): void => {
    if (cards.length > 0) {
      handleSwipe(direction);
    }
  };

  const handleCloseMatchOverlay = (): void => {
    setShowMatchOverlay(false);
    setMatchedUser(null);
  };

  const hasCards = cards.length > 0;
  const currentCard = hasCards ? cards[0] : null;

  if (loading) {
    return <FeedLoadingScreen />;
  }

  return (
    <AppNav>
      <div className={HomePageStyle.feedRoot}>
        <div className={HomePageStyle.cardColumn}>
          <div className={HomePageStyle.cardStage}>
            <AnimatePresence>
              {hasCards && currentCard ? (
                <SwipeCard
                  key={currentCard.id}
                  user={currentCard}
                  onSwipe={handleSwipe}
                />
              ) : (
                <FeedEmptyState onRefresh={feedReset} />
              )}
            </AnimatePresence>
          </div>
        </div>

        <FeedActionButtons
          onLeftSwipe={() => handleButtonClick('left')}
          onRightSwipe={() => handleButtonClick('right')}
          disabled={!hasCards}
        />
      </div>

      <MatchOverlay
        isOpen={showMatchOverlay}
        matchedUser={matchedUser}
        onClose={handleCloseMatchOverlay}
      />
    </AppNav>
  );
};

export default HomePage;
