import { Outlet } from 'react-router-dom';
import { BottomNavMenu } from '../navigation/BottomNavMenu';
import './AppLayout.css';

export const AppLayout = () => {
  return (
    <div className="app-container">
      <div className="page-content">
        <Outlet />
      </div>
      <BottomNavMenu />
    </div>
  );
}; 