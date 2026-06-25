import { useAuth0 } from '@auth0/auth0-react';

import { ProfileStyle } from './ProfileStyle';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isAuthenticated && user ? (
        <div>
          <img
            src={user.picture}
            alt={user.name}
            className={ProfileStyle.avatar}
            referrerPolicy="no-referrer"
          />
          <h2 className={ProfileStyle.name}>{user.name}</h2>
          <p className={ProfileStyle.email}>{user.email}</p>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
