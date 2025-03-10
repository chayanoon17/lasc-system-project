const jwt = require('jsonwebtoken'); 
const User = require('../models/User'); 

const authenticate = async (req, res, next) => {
  const authHeader = req.headers['authorization']; 
  
  // console.log('Authentication middleware triggered');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token is required' }); 
  }

  const token = authHeader.split(' ')[1];
  try {
    // ตรวจสอบ JWT token ด้วยคีย์ลับที่เก็บในไฟล์ .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.user = await User.findById(decoded.userId).select('-password'); 
    if (!req.user) {
      return res.status(401).json({ message: 'User not found' }); 
    }
    
    next(); 
  } catch (error) {
    console.error('Token verification error:', error.message);
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authenticate; 
