// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Card, Input, Button, Typography, Select, Option } from "@material-tailwind/react";
import axios from 'axios';
import Sidebar from '../../Components/common/Sidebar';
import NavbarAdmin from '../../Components/common/NavbarAdmin';
export function Register() {
  const [register, setRegister] = useState({
    username: '',
    password: '',
    role: 'user',
    file: 'file',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
  
    if (name === 'role') {
      setRegister(prev => ({
        ...prev,
        role: value
      }));
    } else {
      setRegister(prev => ({
        ...prev,
        [name]: name === 'file' ? files[0] : value
      }));
    }
  
    console.log(`${name}: ${value}`);
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(register);
    try {
      const formData = new FormData();
      formData.append('username', register.username);
      formData.append('password', register.password);
      formData.append('role', register.role);
      if (register.file) {
        formData.append('file', register.file);
      }
      console.log([...formData]);

      const response = await axios.post('http://localhost:3000/api/users/register', formData, {
        'Content-Type': 'multerpart/foem-data',
      });
      console.log('User registered successfully:', response.data);
      alert('เพิ่มผู้ใช้สำเร็จ');
      window.location.reload();

    } catch (error) {
      console.error('Error registering user:', error.response?.data || error.message);
      alert('เพิ่มข้อมูลไม่สำเร็จ');
    }
  };

  return (
    <>
    <NavbarAdmin/>
      <Sidebar />
      <div className="flex items-center justify-center h-screen">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" color="blue-gray">
            เพิ่มผู้ใช้
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
          เพิ่มผู้ใช้งานในระบบ.
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                รูป
              </Typography>
              <Input
                type="file"
                size="lg"
                name="file"
                onChange={handleChange}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                ชื่อผู้ใช้
              </Typography>
              <Input
                size="lg"
                placeholder="Username"
                name="username"
                value={register.username}
                onChange={handleChange}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                รหัสผ่าน
              </Typography>
              <Input
                type="password"
                size="lg"
                placeholder="********"
                name="password"
                value={register.password}
                onChange={handleChange}
                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              />
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                สถานะ
              </Typography>
              <Select
                size="md"
                label="Role"
                name="role"
                value={register.role} 
                onChange={(e) => setRegister({...register, role: e})}
              >
                <Option value="user">User</Option>
                <Option value="admin">Admin</Option>
              </Select>
            </div>
            <Button type="submit" className="mt-6" fullWidth>
              เพิ่มผู้ใช้
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
}

export default Register;
