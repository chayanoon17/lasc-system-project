// components/UserPage.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import SidebarUser from '../common/SidebarUser';
import NavbarUser from '../common/NavbarUser';

const UserPage = () => {
  return (
    <>
    <NavbarUser/>
    <SidebarUser/>
    <div className="flex min-h-screen dark:bg-gray-900">
        <div className="flex-1 ">
        <div className="animated-text-container">
            <h1 className="animated-text">Welcome to my website LASC</h1>
        </div>
        
        </div>
      </div>
      
    </>
  );
};

export default UserPage;
