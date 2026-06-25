import { useAuth0 } from '@auth0/auth0-react';

import { LoginButtonStyle } from './LoginButtonStyle';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() => loginWithRedirect()}
      className={LoginButtonStyle.button}
    >
      Begin here!
    </button>
  );
};

export default LoginButton;
