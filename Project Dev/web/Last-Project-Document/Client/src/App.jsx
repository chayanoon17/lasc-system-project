// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Footer from './Components/common/Footer';
import IntegratedForm from './Pages/User/IntegratedForm';
import DisplayData from './Pages/User/DisplayData';
import DataTable from './Pages/Admin/DataTable';
import Register from './Pages/Admin/Register';
import Login from './Components/Login';
import UserPage from './Components/User/UserPage';
import AdminPage from './Components/Admin/AdminPage';
import IntegratedFormAdmin from './Pages/Admin/IntegratedFormAdmin';
import Profile from './Pages/User/Profile';
import ProfileAdmin from './Pages/Admin/ProfileAdmin';


function App() {
  return (
    <Router>
      <div className="flex dark:bg-gray-900">
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/user" element={<UserPage/>} />
            <Route path="/pages/user/integratedform" element={<IntegratedForm />} />
            <Route path="/pages/user/displaydata" element={<DisplayData />} />
            <Route path="/pages/user/profile" element={<Profile />} />
            {/*Admin*/}
            <Route path="/admin" element={<AdminPage/>} />
            <Route path="/pages/admin/datatable" element={<DataTable/>} />
            <Route path="/pages/admin/register" element={<Register/>} />
            <Route path="/pages/admin/integratedformadmin" element={<IntegratedFormAdmin />} />
            <Route path="/pages/admin/profileadmin" element={<ProfileAdmin />} />
            {/* Add other routes as needed */}
          </Routes>
        </div>
      </div>

    </Router>
    
  );
}

export default App;
