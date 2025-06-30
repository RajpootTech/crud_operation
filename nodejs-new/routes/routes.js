const express = require('express');
const router = express.Router();
const controller = require('../controller/controller');

router.get('/', controller.listStudents);
router.get('/single-student', controller.viewStudent);
router.get('/add-content', controller.showAddForm);
router.post('/add-content', controller.addStudent);
router.get('/update-content', controller.showUpdateForm);
router.post('/update-content', controller.updateStudent);
router.get('/delete-content', controller.deleteStudent);



module.exports= router;