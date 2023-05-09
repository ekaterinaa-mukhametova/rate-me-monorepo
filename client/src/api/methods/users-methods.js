import axiosConfig from '../config';

const userPath = 'users';

export const sendSignUpCredentials = async ({
  name, email, password, regDate, lastLoginDate,
}) => {
  const response = await axiosConfig.put(`/${userPath}/sign-up`, {
    data: {
      name, email, password, regDate, lastLoginDate,
    },
  });
  return response;
};

export const sendLogInCredentials = async ({ email, password, lastLoginDate }) => {
  const response = await axiosConfig.put(`/${userPath}/log-in`, { data: { email, password, lastLoginDate } });
  return response;
};

export const getUsersData = async () => {
  const response = await axiosConfig.get(`/${userPath}/users-data`);
  return response;
};
