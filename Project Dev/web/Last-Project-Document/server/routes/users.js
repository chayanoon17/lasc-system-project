// routes/users.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticate = require('../middleware/authenticate');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploadsProfile/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpng'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, and PDF files are allowed.'), false);
  }
};

const upload = multer({ storage: storage, ileFilter: fileFilter });

router.post('/register', upload.single('file'), async (req, res) => {
  console.log('Request Body:', req.body);
  console.log('File Info:', req.file);

  try {
    const { username, password, role } = req.body;
    const file = req.file;

    if (!username || !password || !role) {
      return res.status(400).send('Missing required fields');
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).send('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
      profilePicture: file ? file.path : null,
    });

    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).send('Server error');
  }
});


router.get('/profile', authenticate, async (req, res) => {
  try {
    const users = await User.findById(req.user.id).select('username role password hashedPassword profilePicture');
    
    if (!users) {
      return res.status(404).send('User not found');
    }
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error'});
  }
});

// Update User Profile Route
router.put('/profile', authenticate, upload.single('file'), async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const file = req.file;
    const updates = {};

    if (username) updates.username = username;
    if (role) updates.role = role;

    if (password) {
      updates.password = await bcrypt.hash(password, 10);
    }

    if (file) {
      updates.profilePicture = file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true }).select('-password');

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    res.send(updatedUser);
  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).send('Server error');
  }
});


// Login Route
router.post('/login', async (req, res) => {
  try {
    console.log('login success');
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).send('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send('Invalid password');
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }  // Token expires in 1 hour
    );

    res.json({ token, role: user.role });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).send('Server error');
  }
});

router.post('/logout' , authenticate, async (req, res) => {
  try {
    res.status(200).send('Logout success');
  } catch (error) {
    console.error('Logout Error:', error);
    res.status(500).send('Server error');
  }
})


module.exports = router;
