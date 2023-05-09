import React from 'react';
import propTypes from 'prop-types';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';

function AuthBlock(props) {
  const { setUserAuth } = props;
  return (
    <>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#signupModal">Sign up</button>
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">Log in</button>
      <SignUp setUserAuth={setUserAuth} />
      <LogIn setUserAuth={setUserAuth} />
    </>
  );
}

AuthBlock.propTypes = {
  setUserAuth: propTypes.func.isRequired,
};

export default AuthBlock;
