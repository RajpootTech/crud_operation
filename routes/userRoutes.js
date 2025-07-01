const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/create-user', userController.createUser);
router.get('/Get-all-user', userController.getAllUsers);
router.get('/Get-user', userController.getUserById);
router.put('/update-user', userController.updateUser);
router.delete('/delete-user', userController.deleteUser);

module.exports = router;
