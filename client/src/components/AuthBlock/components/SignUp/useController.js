import { useState } from 'react';
import moment from 'moment';
import { sendSignUpCredentials } from '../../../../api/methods/users-methods';
import { errorTypes } from '../../../../api/methods/error-types';

const useController = (setUserAuth) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);

  const verifyEmail = (val) => {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (val.match(regexp) == null) {
      setEmailError(true);
      setEmailErrorMessage('Please provide correct email');
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const regDate = moment().format('YYYY-MM-DD');
    const lastLoginDate = moment().format('YYYY-MM-DD');
    setIsSubmit(true);
    setSubmitError('');
    try {
      if (!name || !email || !password || isEmailError) {
        throw new Error('Please fill all fields!');
      }
      const response = await sendSignUpCredentials({
        name, email, password, regDate, lastLoginDate,
      });
      if (response.data.result === 'ok') {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', email);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('name', name);
        setUserAuth(true);
      } else if (response.data.message === errorTypes.signupError) {
        setSubmitError(errorTypes.signupError);
      } else if (response.data.result === 'error') {
        setSubmitError(errorTypes.unknownError);
      }
    } catch (err) {
      setSubmitError(errorTypes.unknownError);
    }
  };

  return ({
    credentials: {
      name, email, password, isEmailError, emailErrorMessage, submitError, isSubmit,
    },
    setName,
    setPassword,
    setEmail,
    verifyEmail,
    onSubmit,
  });
};

export default useController;
