import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from "@material-tailwind/react";
import LogoSSKRU from '../assets/Images/LogoSSKRU.png'; 


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        username,
        password,
      });
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userId', response.data.userId);
      } else {
        setError('Failed to retrieve token.');
        return;
      }
      switch (response.data.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'user':
          navigate('/user');
          break;
        default:
          setError('Unknown role');
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Server error');
      console.error('Login Error:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md p-8 space-y-4 shadow-md rounded-lg">
      <div className="flex justify-center items-center p-8">
        <img
          src={LogoSSKRU}
          alt="Logo"
          className="w-32 h-50 object-cover rounded-lg"
        />
      </div>
        <h2 className=" font-semibold mb-4 flex justify-center items-center">
       Login Management And Tracking System</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="w-90">
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              label='username'
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="w-90">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              label='Password'
              className="p-2 border border-gray-300 rounded w-full"
              required
            />
          </div>

          <Button
            type="submit"
            fullWidth
          >
            Login
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
