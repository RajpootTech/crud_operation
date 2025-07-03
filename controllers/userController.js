const { User } = require('../models');


const createUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    const errors = [];

    if (!name || name.trim() === '') {
      errors.push({ field: 'name', message: 'Name is required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.push({ field: 'email', message: 'Valid email is required' });
    }

    if (!phone || phone.length < 10) {
      errors.push({ field: 'phone', message: 'Phone must be at least 10 digits' });
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const newUser = await User.create({ name, email, phone });
    res.status(201).json({ message: 'User created successfully', data: newUser });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
     res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    // res.render('single-content', { data: user });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


const updateUser = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) return res.status(404).json({ message: 'User not found' });
    const updatedUser = await User.findByPk(req.params.id);
    res.status(200).json({ message: 'User updated successfully', data: updatedUser });
  } catch (err) {
    console.error('Error in updateUser:', err);
    res.status(500).json({ message: err.message });
  }
};



const deleteUser = async (req, res) => {

  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: 'User ID is required' });
    }
  

    const deleted = await User.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
