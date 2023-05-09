import cx from 'classnames';
import React, { useMemo } from 'react';
import propTypes from 'prop-types';
import Modal from '../../../Modal';
import './SignUp.css';
import useController from './useController';

function SignUp(props) {
  const succesMessage = 'You sign up succesfully and can just close modal now!';
  const { setUserAuth } = props;
  const {
    credentials, setName, setPassword, setEmail, verifyEmail, onSubmit,
  } = useController(setUserAuth);
  const {
    name,
    email,
    password,
    isEmailError,
    emailErrorMessage,
    submitError,
    isSubmit,
  } = credentials;

  const SignUpModalBody = useMemo(() => (
    <>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="John Bowl"
          required
          value={name}
          onChange={(event) => { setName(event.target.value); }}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input
          type="email"
          className={cx('form-control', { 'is-invalid': isEmailError })}
          placeholder="name@example.com"
          required
          value={email}
          onChange={(event) => { setEmail(event.target.value); }}
          onBlur={() => { verifyEmail(email); }}
        />
        <div className="invalid-feedback">
          {emailErrorMessage}
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="text"
          className="form-control"
          required
          value={password}
          onChange={(event) => { setPassword(event.target.value); }}
        />
      </div>
      {isSubmit && <div className="mb-3">{submitError || succesMessage}</div>}
    </>
  ), [name, setName, isEmailError, email, setEmail, verifyEmail, emailErrorMessage]);

  const SignUpModalFooter = useMemo(() => (
    <>
      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Skip</button>
      <button type="submit" onClick={onSubmit} className="btn btn-primary">Send</button>
    </>
  ), [onSubmit]);

  return (<Modal id="signupModal" header="Sign up" body={SignUpModalBody} footer={SignUpModalFooter} withCloseButton />
  );
}

SignUp.propTypes = {
  setUserAuth: propTypes.func,
};

SignUp.defaultProps = {
  setUserAuth: () => {},
};

export default SignUp;
