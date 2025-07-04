const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/create-user',userController.createUser);
router.get('/get-all-user', userController.getAllUsers);
router.get('/get-user/:id', userController.getUserById);
router.put('/update-user/:id', userController.updateUser);
router.delete('/delete-user/:id', userController.deleteUser);

module.exports = router;