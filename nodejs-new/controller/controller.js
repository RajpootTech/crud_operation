const Student = require('../models/models'); 

const listStudents = async (req, res) => {
    try {
        const students = await Student.getAllStudents(); 
        res.render('home', { data: students });     
    } catch (err) {
        console.error('Error fetching students:', err);
        res.status(500).send('Database error');
    }
};
const viewStudent = async (req, res) => {
    const id = req.query.id;
    try {
        const student = await Student.getStudentById(id);
        res.render('single-content', { data: student });
    } catch (err) {
        console.error('Error fetching student:', err);
        res.status(500).send('Database error');
    }
}

const showAddForm = (req, res) => {
    res.render('add-content');
}   
const addStudent = async (req, res) => {
    const studentData = req.body;
    try {
        const newStudent = await Student.addStudent(studentData);
        res.redirect('/');
    } catch (err) {
        console.error('Error adding student:', err);
        res.status(500).send('Database error');
    }
}   
const showUpdateForm = async (req, res) => {
    const id = req.query.id;
    try {
        const student = await Student.getStudentById(id);
        res.render('Update-content', { data: student });
    } catch (err) {
        console.error('Error fetching student for update:', err);
        res.status(500).send('Database error');
    }
}
const updateStudent = async (req, res) => {
    const id = req.query.id;
    const studentData = req.body;
    try {
        const updatedStudent = await Student.updateStudent(id, studentData);
        res.redirect('/');
    } catch (err) {
                console.error('Error updating student:', err);
                res.status(500).send('Database error');
            }
        }
        
const deleteStudent = async (req, res) => {
    const id = req.query.id;
    try {
        await Student.deleteStudent(id);
        res.redirect('/');
    } catch (err) {
        console.error('Error deleting student:', err);
        res.status(500).send('Database error');
    }
}
module.exports = {
    listStudents,
    viewStudent,
    showAddForm,
    addStudent,
    showUpdateForm,
    updateStudent,
    deleteStudent
};