import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

import { useAuth0 } from '@auth0/auth0-react';

import { TOKEN_KEY } from '../../api/client';

const GlobalSocketListener = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  useEffect(() => {
    if (!isAuthenticated || isLoading) {
      return;
    }

    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return;
    }

    const socket = io(
      import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000',
      {
        // withCredentials: true,
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    // setTimeout(() => {
    //     toast.success(`You have a new match 📚`, {
    //         position: 'top-right',
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //     });
    // }, 2000);

    socket.on('match', (data) => {
      console.log('Received match event:', data);
      toast.success(`You have a new match 📚`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      window.dispatchEvent(new CustomEvent('refetch-matches-badge'));
    });

    socket.on('connect', () => {
      console.log('Socket connected!', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected!');
    });

    return () => {
      socket.disconnect();
    };
  }, [isAuthenticated, isLoading]);

  return null;
};

export default GlobalSocketListener;
