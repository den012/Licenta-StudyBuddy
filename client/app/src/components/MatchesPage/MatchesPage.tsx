import { ChatIcon } from '@phosphor-icons/react';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AppNav from '../helper/AppNav';
import UserCard, { UserCardStyle } from '../UserCard';

import { MatchesPageStyle } from './MatchesPageStyle';

const API_URL = import.meta.env.VITE_API_URL;

const MatchesPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(`${API_URL}/swipes-matches`);

        if (response.status !== 200) throw new Error('failed to fetch matches');

        setMatches(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return (
      <div className={MatchesPageStyle.loading}>
        <div className={MatchesPageStyle.loadingText}>Loading matches...</div>
      </div>
    );
  }

  return (
    <AppNav title="Matches">
      <div className={MatchesPageStyle.shell}>
        <main className={MatchesPageStyle.main}>
          {matches.length === 0 ? (
            <div className={MatchesPageStyle.empty}>
              <p className={MatchesPageStyle.emptyText}>
                No connections yet. Like people on the feed to see mutual
                matches here.
              </p>
              <button className={MatchesPageStyle.emptyButton}>
                Go to feed
              </button>
            </div>
          ) : (
            <ul className={MatchesPageStyle.list}>
              {matches.map((user: any) => (
                <UserCard
                  key={user.id}
                  user={user}
                  action={
                    <Link
                      to={`/dm/${user.id}`}
                      className={UserCardStyle.actionLink}
                    >
                      <ChatIcon size={22} weight="regular" />
                    </Link>
                  }
                />
              ))}
            </ul>
          )}
        </main>
      </div>
    </AppNav>
  );
};

export default MatchesPage;
