// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../../Components/common/SidebarUser';
import {
  Avatar,
  Input,
  Button,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import NavbarUser from '../../Components/common/NavbarUser';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('authToken'); 
        const response = await axios.get('http://localhost:3000/api/users/profile/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setUsername(response.data.username);
        setRole(response.data.role);
        setProfilePicture(response.data.profilePicture);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'เกิดข้อผิดพลาดในการเชื่อมต่อ');
      }
    };
    
    fetchUserProfile();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const formData = new FormData();
      formData.append('username', username);
      formData.append('role', role);
      if (password) formData.append('password', password);
      if (profilePicture) formData.append('file', profilePicture);

      await axios.put('http://localhost:3000/api/users/profile', formData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });

      // Refresh the profile

      const response = await axios.get('http://localhost:3000/api/users/profile/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      alert('UPDATE Success')
    } catch (err) {
      setError(err.response ? err.response.data.message : 'เกิดข้อผิดพลาดในการเชื่อมต่อ');
    }
  };

  if (error) return <div className='text-red-500 text-center mt-4'>{error}</div>;

  return (
    <>
    <NavbarUser/>
      <Sidebar />
      <div className='flex flex-col lg:flex-row justify-center items-center h-screen bg-white p-4'>
        <Tabs id="custom-animation" value="profile" className="w-full max-w-md">
          <TabsHeader className="relative z-0">
            <Tab value="profile" className="text-xl font-semibold">Profile</Tab>
            <Tab value="edit" className="text-xl font-semibold">Edit</Tab>
          </TabsHeader>
          <TabsBody
            animate={{
              initial: { y: 250 },
              mount: { y: 0 },
              unmount: { y: 250 },
            }}
          >
            <TabPanel value="profile" className="p-0">
              <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto'>
              <form className='flex flex-col gap-4'>
              <div className='flex flex-col items-center'>
                  {user && user.profilePicture ? (
                    <Avatar
                      src={`http://localhost:3000/${user.profilePicture}`}
                      alt="avatar"
                      size="xxl"
                    />
                  ) : (
                    <div className='w-24 h-24 rounded-full bg-gray-200 mb-4'></div>
                  )}
                  <h1 className='text-2xl font-semibold mb-4'>Profile</h1>
                  <div className='text-center'>
                    <p className='text-lg font-medium'>Username: {user?.username}</p>
                    <p className='text-lg font-medium'>Role: {user?.role}</p>
                    {/* Add more profile information if needed */}
                  </div>
                </div>
              </form>
                
              </div>
            </TabPanel>
            <TabPanel value="edit" className="p-6">
              <div className='bg-white shadow-lg rounded-lg p-6 w-full max-w-md mx-auto'>
                <form onSubmit={handleProfileUpdate} className='flex flex-col gap-4'>
                  <Input
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className='!border-t-blue-gray-200 focus:!border-t-gray-900'
                  />
                  <Input
                    type="password"
                    label="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className='!border-t-blue-gray-200 focus:!border-t-gray-900'
                  />
                  <Input
                    label="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className='!border-t-blue-gray-200 focus:!border-t-gray-900'
                  />
                  <input
                    type="file"
                    onChange={(e) => setProfilePicture(e.target.files[0])}
                    className='!border-t-blue-gray-200 focus:!border-t-gray-900'
                  />
                   {user && user.profilePicture ? (
                    <Avatar
                      src={`http://localhost:3000/${user.profilePicture}`}
                      alt="avatar"
                      size="xxl"
                    />
                  ) : (
                    <div className='w-24 h-24 rounded-full bg-gray-200 mb-4'></div>
                  )}
                  <Button type="submit" className='mt-4'>Update Profile</Button>
                </form>
              </div>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </>
  );
};

export default Profile;
