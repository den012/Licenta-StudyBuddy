import React from 'react';
import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import LoginButton from '../../authComponents/LoginButton';

import { LoginPageStyle } from './LoginPageStyle';

const Login: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate('/bio', { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className={LoginPageStyle.loadingScreen}>
        <div className={LoginPageStyle.loadingInner}>
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className={LoginPageStyle.main}>
      <div className={LoginPageStyle.content}>
        <h1 className={LoginPageStyle.title}>
          Do you want to trade your knowledge?
        </h1>
        <h2 className={LoginPageStyle.subtitle}>
          Master math but struggle with chemistry? Find your perfect study
          buddy and trade knowledge to ace every class{' '}
          <span className={LoginPageStyle.emoji}>📚</span>
        </h2>
        <div className={LoginPageStyle.loginRow}>
          <LoginButton />
        </div>
      </div>
    </div>
  );
};

export default Login;
