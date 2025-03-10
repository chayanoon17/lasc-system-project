import React, { useEffect, useState } from 'react';
import axios from 'axios';

import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  Avatar,
  IconButton,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";

 
 
function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [user, setUser] = useState(null);
  const [setUsername] = useState('');
  const [setProfilePicture] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [Error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('authToken'); 
        const response = await axios.get('http://localhost:3000/api/users/profile/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setUsername(response.data.username);
        setProfilePicture(response.data.profilePicture);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'เกิดข้อผิดพลาดในการเชื่อมต่อ');
      }
    };
    
    fetchUserProfile();
  },);
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
                    <p className='text-lg font-medium'>Hi ?: {user?.username}</p>

           {user && user.profilePicture ? (
                    <Avatar
                      src={`http://localhost:3000/${user.profilePicture}`}
                      alt="avatar"
                      size="sm"
                    />
                  ) : (
                    <div className='w-24 h-24 rounded-full bg-gray-200 mb-4'></div>
                  )}
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
    </Menu>
  );
}
 
 

 
function NavList() {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">

        <Typography

          as="a"
          href="#"
          variant="small"
          color="gray"
          className="font-medium text-blue-gray-500"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">


          </MenuItem>
        </Typography>

    </ul>
  );
}
 
export function NavbarUser() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
 
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);
 
  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          LASC Users
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>
 
        <ProfileMenu />
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
  );
}

export default NavbarUser;