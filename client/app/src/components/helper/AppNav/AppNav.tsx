import { HandshakeIcon, HouseIcon, UserIcon } from '@phosphor-icons/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { AppNavStyle } from './AppNavStyle';

const API_URL = import.meta.env.VITE_API_URL;

interface Props {
  children: React.ReactNode;
  title?: string;
}

const Button = ({
  children,
  mlAuto,
  to,
}: {
  children: React.ReactNode;
  mlAuto?: boolean;
  to: string;
}) => {
  return (
    <NavLink
      className={({ isActive }) =>
        `${AppNavStyle.navButtonBase} ${isActive ? AppNavStyle.navButtonActive : AppNavStyle.navButtonInactive} ${mlAuto ? AppNavStyle.navButtonMlAuto : ''}`
      }
      to={to}
    >
      {children}
    </NavLink>
  );
};

const AppNav: React.FC<Props> = ({ children, title }) => {
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const location = useLocation();

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const response = await axios.get(`${API_URL}/swipes-matches-unread`);
        if (
          response.status === 200 &&
          typeof response.data?.data === 'number'
        ) {
          setUnreadCount(response.data.data);
        }
      } catch {
        // ignore
      }
    };

    if (location.pathname === '/matches')
      axios.post(`${API_URL}/swipes-matches-unread`);

    fetchUnread();
  }, [location.pathname]);

  useEffect(() => {
    const handler = () => {
      axios
        .get(`${API_URL}/swipes-matches-unread`)
        .then((response) => {
          if (
            response.status === 200 &&
            typeof response.data?.data === 'number'
          ) {
            setUnreadCount(response.data.data);
          }
        })
        .catch(() => {});
    };
    window.addEventListener('refetch-matches-badge', handler);
    return () => window.removeEventListener('refetch-matches-badge', handler);
  }, []);

  return (
    <div className={AppNavStyle.layout}>
      <nav className={AppNavStyle.nav}>
        <Button to="/home">
          <HouseIcon size={24} />
        </Button>

        <h1 className={AppNavStyle.title}>{title ?? 'StudyBuddy'}</h1>

        <Button mlAuto to="/profile">
          <UserIcon size={24} />
        </Button>

        <span className={AppNavStyle.badgeWrap}>
          <Button to="/matches">
            <HandshakeIcon size={24} />
          </Button>

          {unreadCount > 0 && (
            <span className={AppNavStyle.unreadBadge}>{unreadCount}</span>
          )}
        </span>
      </nav>

      <main className={AppNavStyle.main}>{children}</main>
    </div>
  );
};

export default AppNav;
