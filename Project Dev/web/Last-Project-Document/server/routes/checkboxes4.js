const express = require('express');
const router = express.Router();
const Checkbox = require('../models/Checkbox4');

// GET all checkboxes
router.get('/', async (req, res) => {
  try {
    const checkboxes = await Checkbox.find();
    res.json(checkboxes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new checkbox
router.post('/', async (req, res) => {
  const { id, label, checked } = req.body;
  if (!id || !label || checked === undefined) {
    return res.status(400).json({ message: 'ข้อมูลไม่ครบถ้วน' });
  }
  const newCheckbox = new Checkbox({ id, label, checked });
  try {
    await newCheckbox.save();
    res.status(201).json(newCheckbox);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update a checkbox
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { label, checked } = req.body;
  try {
    const checkbox = await Checkbox.findOneAndUpdate({ id }, { label, checked }, { new: true });
    if (!checkbox) {
      return res.status(404).json({ message: 'Checkbox not found' });
    }
    res.json(checkbox);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a checkbox
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const checkbox = await Checkbox.findOneAndDelete({ id });
    if (!checkbox) {
      return res.status(404).json({ message: 'Checkbox not found' });
    }
    res.json({ message: 'Checkbox deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
