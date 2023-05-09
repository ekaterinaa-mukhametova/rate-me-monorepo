import { useState } from 'react';
import moment from 'moment';
import { sendLogInCredentials } from '../../../../api/methods/users-methods';
import { errorTypes } from '../../../../api/methods/error-types';

const useController = (setUserAuth) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    const lastLoginDate = moment().format('YYYY-MM-DD');
    try {
      const response = await sendLogInCredentials({ lastLoginDate, email, password });
      if (response.data.result === 'ok') {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', email);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('name', response.data.name);
        setSubmitError('');
        setUserAuth(true);
        setIsSubmit(true);
      } else if (response.data.message === errorTypes.loginError) {
        setSubmitError(errorTypes.loginError);
      } else if (response.data.result === 'error') {
        setSubmitError(errorTypes.unknownError);
      }
    } catch (err) {
      setSubmitError(errorTypes.unknownError);
    }
  };

  return ({
    credentials: {
      email, password, isSubmit, submitError,
    },
    setPassword,
    setEmail,
    onSubmit,
  });
};

export default useController;
