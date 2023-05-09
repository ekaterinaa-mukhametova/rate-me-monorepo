const getUserAuthData = () => {
  const userName = localStorage.getItem('name');
  const userId = localStorage.getItem('userId');

  return { userName, userId };
};

export default getUserAuthData;
