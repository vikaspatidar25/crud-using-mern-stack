const express = require('express');
const User = require('../models/user');
const router = express.Router();

// CREATE item
router.post('/create', async (req, res) => {
  const { name, description } = req.body;
  try {
    const newUser = new User({ name, description });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Error creating item' });
  }
});

// READ all items
router.get('/getuser', async (req, res) => {
  try {
    const Users = await User.find();
    res.json(Users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items' });
  }
});

// UPDATE item
router.put('/update/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating item' });
  }
});

// DELETE item
router.delete('/delete/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item' });
  }
});

module.exports = router;
