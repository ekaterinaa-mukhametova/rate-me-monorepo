import React, { useMemo } from 'react';
import propTypes from 'prop-types';
import cx from 'classnames';
import Modal from '../../../Modal';
import './LogIn.css';
import useController from './useController';
import { errorTypes } from '../../../../api/methods/error-types';

function LogIn(props) {
  const succesMessage = 'You login succesfully and can just close modal now!';
  const { setUserAuth } = props;
  const {
    credentials, setPassword, setEmail, onSubmit,
  } = useController(setUserAuth);
  const {
    email, password, submitError, isSubmit,
  } = credentials;

  const LogInModalBody = useMemo(() => (
    <form>
      <div className="mb-3">
        <label className="form-label text-bg-dark">Email address</label>
        <input
          type="email"
          className={cx('form-control', { 'is-invalid': submitError === errorTypes.loginError })}
          placeholder="name@example.com"
          required
          value={email}
          onChange={(event) => { setEmail(event.target.value); }}

        />
      </div>
      <div className="mb-3">
        <label className="form-label text-bg-dark">Password</label>
        <input
          type="text"
          className={cx('form-control', { 'is-invalid': submitError === errorTypes.loginError })}
          required
          value={password}
          onChange={(event) => { setPassword(event.target.value); }}
        />
        <div className="invalid-feedback">
          {submitError}
        </div>
      </div>
      {isSubmit && <div className="mb-3">{submitError || succesMessage}</div>}
    </form>
  ), [isSubmit, submitError, email, setEmail, password, setPassword]);

  const LogInModalFooter = useMemo(() => (
    <>
      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Skip</button>
      <button type="submit" onClick={onSubmit} className="btn btn-primary">Send</button>
    </>
  ), [onSubmit]);

  return (
    <Modal id="loginModal" header="Log in" body={LogInModalBody} footer={LogInModalFooter} withCloseButton />
  );
}

LogIn.propTypes = {
  setUserAuth: propTypes.func,
};

LogIn.defaultProps = {
  setUserAuth: () => {},
};

export default LogIn;
