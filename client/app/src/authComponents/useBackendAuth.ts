import { useEffect, useRef, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { TOKEN_KEY } from '../api/client';
import axios from 'axios';

export function useBackendAuth(): { isBackendReady: boolean } {
  const { isAuthenticated, getIdTokenClaims } = useAuth0();
  const synced = useRef(false);
  const [syncDone, setSyncDone] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      synced.current = false;
      setSyncDone(false);
      localStorage.removeItem(TOKEN_KEY);
      return;
    }

    let cancelled = false;

    const sync = async () => {
      try {
        const claims = await getIdTokenClaims();
        const idToken = claims?.__raw;
        if (cancelled || !idToken) return;
        const { data } = await axios.post<{ data: { token: string } }>(
          '/api/auth',
          {
            accessToken: idToken,
          },
        );
        if (cancelled) return;
        const token =
          data?.data?.token ?? (data as unknown as { token: string }).token;
        if (token) {
          localStorage.setItem(TOKEN_KEY, token);
        }
        synced.current = true;
      } catch (err) {
        if (!cancelled) {
          console.error('Backend auth failed:', err);
          localStorage.removeItem(TOKEN_KEY);
        }
      } finally {
        if (!cancelled) setSyncDone(true);
      }
    };

    if (!synced.current) {
      sync();
    } else {
      setSyncDone(true);
    }

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, getIdTokenClaims]);

  return { isBackendReady: !isAuthenticated || syncDone };
}
