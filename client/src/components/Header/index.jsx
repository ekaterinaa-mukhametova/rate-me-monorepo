import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import getUserAuthData from '../../helpers/getUserAuthData';
import AuthBlock from '../AuthBlock';
import LanguageSwitcher from '../LanguageSwitcher';
import ThemeSwitcher from '../ThemeSwitcher';
import FullTextSearch from '../FullTextSearch';

function Header() {
  const [isUserAuth, setUserAuth] = useState(false);
  // TODO: check auth on backend
  // TODO: open auth modal from any other elements
  // TODO: fix bug witn Submit button on Log In modal
  const { userName, userId } = getUserAuthData();
  useEffect(() => {
    if (userName) {
      setUserAuth(true);
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    setUserAuth(false);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <div className="d-md-flex">
          <LanguageSwitcher className="me-2" />
          <ThemeSwitcher />
        </div>
        <FullTextSearch />
        {isUserAuth ? (
          <>
            <div>
              <Link to={`/user-profile/${userId}`} className="text-white mb-0">
                {userName}
              </Link>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={logOut}
            >
              Log Out
            </button>
          </>
        )
          : <AuthBlock setUserAuth={setUserAuth} />}
      </div>
    </nav>
  );
}

export default Header;
