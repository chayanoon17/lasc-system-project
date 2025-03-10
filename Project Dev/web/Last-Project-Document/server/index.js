// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const authenticate = require('./middleware/authenticate'); 
const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();
console.log('Database URI:', process.env.DB_URI);
console.log('Port:', process.env.PORT);
console.log('JWT Secret:', process.env.JWT_SECRET);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Connect to MongoDB
mongoose.connect(process.env.DB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploadsprofile', express.static(path.join(__dirname, 'uploadsprofile')));

// Routes
app.use('/api/checkboxes', require('./routes/checkboxes'));
app.use('/api/checkboxes1', require('./routes/checkboxes1'));
app.use('/api/checkboxes2', require('./routes/checkboxes2'));
app.use('/api/checkboxes3', require('./routes/checkboxes3'));
app.use('/api/checkboxes4', require('./routes/checkboxes4'));
app.use('/api/formdata', authenticate, require('./routes/formdata'));
app.use('/api/users', require('./routes/users')); 

// Define a simple route  
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
