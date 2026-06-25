import { useAuth0 } from '@auth0/auth0-react';

import { LogoutButtonStyle } from './LogoutButtonStyle';

const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    localStorage.clear();

    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <button
      onClick={handleLogout}
      className={LogoutButtonStyle.button}
    >
      Take me out of here!
    </button>
  );
};

export default LogoutButton;
