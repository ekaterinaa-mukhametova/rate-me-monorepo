import { useEffect, useState } from 'react';
import { getUsersData } from '../../api/methods/users-methods';
import { errorTypes } from '../../api/methods/error-types';

const useController = () => {
  const [adminPanelData, setAdminPanelData] = useState([]);
  const [usersDataError, setUsersDataError] = useState('');

  useEffect(() => {
    const getAdminPanelData = async () => {
      setUsersDataError('');
      try {
        const { data: response } = await getUsersData();
        if (response.message === errorTypes.noPermissionError
            || response.message === errorTypes.notAuthError) {
          setUsersDataError(response.message);
        } else if (response.usersData !== undefined) {
          setAdminPanelData(response.usersData);
        }
      } catch (err) {
        setUsersDataError(errorTypes.unknownError);
      }
    };

    if (adminPanelData.length === 0) {
      getAdminPanelData();
    }
  }, []);

  return ({ adminPanelData, usersDataError });
};

export default useController;
