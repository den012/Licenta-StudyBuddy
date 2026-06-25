import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//components
import LoginPage from './components/LoginPage';
import BioPage from './components/BioPage';
import SkillsPage from './components/SkillsPage';
import HomePage from './components/HomePage';
import MyProfile from './components/MyProfile';
import ChatRoom from './components/ChatRoom';

//socket listenred
import GlobalSocketListener from './components/helper/GlobalSocketListener';

//auth0
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useBackendAuth } from './authComponents/useBackendAuth';

import MatchesPage from './components/MatchesPage';

import './api/client';
import axios from 'axios';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AppStyle } from './AppStyle';

const API_URL = import.meta.env.VITE_API_URL;

const Auth0ProviderWithNavigate = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState?: any) => {
    // Don't redirect immediately, let AuthGuard handle the redirect based on user status
    navigate(appState?.returnTo || '/', { replace: true });
  };

  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        scope: 'openid profile email picture',
      }}
      cacheLocation="localstorage"
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

const LoadingSpinner: React.FC = () => (
  <div className={AppStyle.loadingRoot}>
    <div className={AppStyle.loadingText}>Loading...</div>
  </div>
);

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { isBackendReady } = useBackendAuth();

  if (isLoading || (isAuthenticated && !isBackendReady)) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return <>{children}</>;
};

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { isBackendReady } = useBackendAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  const checkUserStatus = async () => {
    try {
      const responseBio = await axios.get(`${API_URL}/me`);
      const responseSkills = await axios.get(`${API_URL}/my-skills`);

      const userProfile = responseBio.data.data;
      const userSkills = responseSkills.data.data;
      console.log(userSkills);
      
      const hasBio = userProfile.bio && userProfile.bio.trim().length > 0;
      
      const hasSkills = userSkills.know && userSkills.know.length > 0;
      
      if (!hasBio) {
        navigate('/bio', { replace: true });
      } else if (!hasSkills) {
        navigate('/skills', { replace: true });
      } else {
        navigate('/home', { replace: true });
      }
    } catch (error) {
      console.error('Error checking user status:', error);
      navigate('/bio', { replace: true });
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated && isBackendReady) {
      if (location.pathname === '/' || location.pathname === '/login') {
        checkUserStatus();
      } else {
        setIsChecking(false);
      }
    } else if (!isLoading && !isAuthenticated) {
      setIsChecking(false);
    }
  }, [isAuthenticated, isLoading, isBackendReady, location.pathname, navigate]);

  if (isLoading || (isAuthenticated && isBackendReady && isChecking)) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated) {
    //authguard will handle
    return null;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
    return (
      <>
        <GlobalSocketListener />
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/bio"
            element={
              <ProtectedRoute>
                <BioPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/skills"
            element={
              <ProtectedRoute>
                <SkillsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/matches"
            element={
              <ProtectedRoute>
                <MatchesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dm/:userId"
            element={
              <ProtectedRoute>
                <ChatRoom />
              </ProtectedRoute>
            }
          />
        </Routes>
        <ToastContainer />
      </>
    );
};

const App: React.FC = () => {
  return (
    <Router>
      <Auth0ProviderWithNavigate>
        <AuthGuard>
          <AppRoutes />
        </AuthGuard>
      </Auth0ProviderWithNavigate>
    </Router>
  );
};

export default App;