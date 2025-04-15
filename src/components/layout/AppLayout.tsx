import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNavMenu } from '../navigation/BottomNavMenu';
import './AppLayout.css';

export const AppLayout = React.memo(() => {
  return (
    <div className="app-container">
      <div className="page-content">
        <Outlet />
      </div>
      <BottomNavMenu />
    </div>
  );
});