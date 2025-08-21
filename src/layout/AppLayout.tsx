import { SidebarProvider, useSidebar } from '../context/SidebarContext';
import { Outlet } from 'react-router';
import { useLocation, useNavigate } from 'react-router-dom';
import AppHeader from './AppHeader';
import Backdrop from './Backdrop';
import AppSidebar from './AppSidebar';
import React, { useEffect } from 'react';
import { getCookieLocal } from '../utils/auth';

const LayoutContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = getCookieLocal('token');

  useEffect(() => {
    checkAuthorization();
  }, [location.pathname]);

  const checkAuthorization = async () => {
    // const currentUser = token && (await getCurrentUser(''));
    // setRouterPath(location.pathname);
    console.log('location.pathname', location.pathname);
    if (location.pathname !== '/signin') {
      // localStorage.setItem('currentUser', JSON.stringify(currentUser && currentUser?.data?.data));
      if (token) {
        navigate(`${location.pathname}`);
      } else {
        navigate('/signin');
      }
    }
  };
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  return (
    <div className='min-h-screen xl:flex'>
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? 'lg:ml-[290px]' : 'lg:ml-[90px]'
        } ${isMobileOpen ? 'ml-0' : ''}`}
      >
        <AppHeader />
        <div className='p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
