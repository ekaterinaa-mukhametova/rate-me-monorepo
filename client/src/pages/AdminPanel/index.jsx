import React from 'react';
import UsersTable from '../../components/Table';
import useController from './useController';
import './AdminPanel.css';

function AdminPanel() {
  const { adminPanelData, usersDataError } = useController();

  return (
    <div className="container">
      {usersDataError && <div className="container">{usersDataError}</div>}
      <UsersTable
        content={adminPanelData}
      />
    </div>
  );
}

export default AdminPanel;
