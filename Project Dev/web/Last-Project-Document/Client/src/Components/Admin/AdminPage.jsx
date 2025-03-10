// AdminPage.jsx
// eslint-disable-next-line no-unused-vars
import React from 'react';
import Sidebar from '../common/Sidebar';
import NavbarAdmin from '../common/NavbarAdmin';
const AdminPage = () => {
  
  return (
    <>
    <NavbarAdmin/>
    <Sidebar/>
    <div className="flex min-h-screen dark:bg-gray-900">
        <div className="flex-1">
        <div className="animated-text-container ">
            <h1 className="animated-text ">Welcome to my website LASC</h1>
        </div>
        </div>
      </div>
      </>
  );
};

export default AdminPage;
