const express = require('express');
const router = express.Router();
const multer = require('multer');
const FormData = require('../models/FormData');
const User = require('../models/User'); 
const authenticate = require('../middleware/authenticate');
const mongoose = require('mongoose');

// ตั้งค่าการเก็บไฟล์สำหรับ multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPG, PNG, and PDF files are allowed.'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Handle file upload and form data
router.post('/', upload.single('file'), authenticate, async (req, res) => {
  console.log('User:', req.user); // Add this line to debug

  try {
    const { department, projectName, projectManager, duration, location } = req.body;

    if (!department || !projectName || !projectManager || !duration || !location) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    let checkboxes, checkboxes1, checkboxes2, checkboxes3, checkboxes4, integration, budgetItems;
    try {
      checkboxes = JSON.parse(req.body.checkboxes);
      checkboxes1 = JSON.parse(req.body.checkboxes1);
      checkboxes2 = JSON.parse(req.body.checkboxes2);
      checkboxes3 = JSON.parse(req.body.checkboxes3);
      checkboxes4 = JSON.parse(req.body.checkboxes4);
      integration = JSON.parse(req.body.integration);
      budgetItems = JSON.parse(req.body.budgetItems);

      if (!Array.isArray(checkboxes) || !Array.isArray(budgetItems) || !Array.isArray(checkboxes1)
        || !Array.isArray(checkboxes2)
        || !Array.isArray(checkboxes3)
        || !Array.isArray(checkboxes4)) {
        return res.status(400).json({ message: 'Checkboxes and budget items should be arrays' });
      }
    } catch (error) {
      return res.status(400).json({ message: 'Error parsing JSON data', error: error.message });
    }

    if (!checkboxes.every(cb => cb.id && cb.label !== undefined && cb.checked !== undefined)) {
      return res.status(400).json({ message: 'Invalid checkbox data' });
    }
    if (!checkboxes1.every(cb => cb.id && cb.label !== undefined && cb.checked !== undefined)) {
      return res.status(400).json({ message: 'Invalid checkbox data' });
    }
    if (!checkboxes2.every(cb => cb.id && cb.label !== undefined && cb.checked !== undefined)) {
      return res.status(400).json({ message: 'Invalid checkbox data' });
    }
    if (!checkboxes3.every(cb => cb.id && cb.label !== undefined && cb.checked !== undefined)) {
      return res.status(400).json({ message: 'Invalid checkbox data' });
    }
    if (!checkboxes4.every(cb => cb.id && cb.label !== undefined && cb.checked !== undefined)) {
      return res.status(400).json({ message: 'Invalid checkbox data' });
    }
    

    // สมมุติว่าเราใช้ token ในการตรวจสอบตัวตน
    const userId = req.user._id; // `req.user` คือข้อมูลของผู้ใช้ที่ล็อกอินอยู่
    const username = req.user.username; // สมมุติว่า `username` มีใน `req.user`


    const filePath = req.file ? req.file.path : '';
    const formData = new FormData({
      userId, username, department, projectName, projectManager, duration, location, checkboxes, checkboxes1, checkboxes2, checkboxes3, checkboxes4, integration, budgetItems, filePath
    });

    await formData.save();
    res.status(201).json(formData);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

router.put('/:id', upload.single('file'), authenticate, async (req, res) => {
  console.log('📌 User:', req.user);
  console.log('📌 Body Data:', req.body);
  console.log('📌 Uploaded File:', req.file ? req.file.filename : "ไม่มีไฟล์ถูกอัปโหลด");

  try {
      const { department, projectName, projectManager, duration, location } = req.body;

      if (!department || !projectName || !projectManager || !duration || !location) {
          return res.status(400).json({ message: 'Missing required fields' });
      }

      let checkboxes = JSON.parse(req.body.checkboxes || '[]');
      let checkboxes1 = JSON.parse(req.body.checkboxes1 || '[]');
      let checkboxes2 = JSON.parse(req.body.checkboxes2 || '[]');
      let checkboxes3 = JSON.parse(req.body.checkboxes3 || '[]');
      let checkboxes4 = JSON.parse(req.body.checkboxes4 || '[]');
      let integration = JSON.parse(req.body.integration || '{}');
      let budgetItems = JSON.parse(req.body.budgetItems || '[]');

      const filePath = req.file ? req.file.path : req.body.filePath || '';

      const updatedFormData = await FormData.findByIdAndUpdate(
          req.params.id,
          {
              department, projectName, projectManager, duration, location,
              checkboxes, checkboxes1, checkboxes2, checkboxes3, checkboxes4,
              integration, budgetItems, filePath
          },
          { new: true }
      );

      if (!updatedFormData) {
          return res.status(404).json({ message: 'FormData not found' });
      }

      res.status(200).json(updatedFormData);
  } catch (error) {
      console.error("🛑 Error updating:", error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});



router.get('/:id', authenticate, async (req, res) => {
  try {
    const userId = req.user._id; // Get the ID of the currently authenticated user

    const formData = await FormData.find( { userId: userId} ); // Fetch all form data
    res.json(formData);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

router.get('/', authenticate, async (req, res) => {
  try {
    const formData = await FormData.find();
    res.json(formData);
  } catch (error) {
    res.status(500).json({ message: 'แสดงข้อมูลไม่ผิดผลาด', error: error.message });
  }
});

router.put('/:id/status', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['รอดำเนินการ', 'กำลังดำเนินการ', 'เสร็จสิ้น', 'ไม่ผ่านการอนุมัติ'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updatedData = await FormData.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedData) {
      return res.status(404).json({ message: 'Data not found' });
    }

    res.json(updatedData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', authenticate, async (req, res) => {
  const { id } = req.params;
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }
    const formData = await FormData.findByIdAndDelete(id);
    if (!formData) {
      return res.status(404).json({ message: 'FormData not found' });
    }
    res.json({ message: 'FormData deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
