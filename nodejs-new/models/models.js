const client = require('../database');

const getAllStudents = async () => {
    try {
        const result = await client.query('SELECT * FROM students');
        return result.rows;
    } catch (err) {
        console.error('Error fetching contents:', err);
        throw err;
    }
}

const getStudentById = async (id) => {
    try {
        const result = await client.query('SELECT * FROM students WHERE id = $1', [id]);
        return result.rows[0];
    } catch (err) {
        console.error('Error fetching content by ID:', err);
        throw err;
    }
}
const addStudent = async (student) => {
    const { name, age, email } = student;
    try {
        const result = await client.query(
            'INSERT INTO students (name, age, email) VALUES ($1, $2, $3) RETURNING *',
            [name, age, email]
        );
        return result.rows[0];
    } catch (err) {
        console.error('Error adding content:', err);
        throw err;
    }
}
const updateStudent = async (id, student) => {
    const { name, age, email } = student;
    try {
        const result = await client.query(
            'UPDATE students SET name = $1, age = $2, email = $3 WHERE id = $4 RETURNING *',
            [name, age, email, id]
        );
        return result.rows[0];
    } catch (err) {
        console.error('Error updating content:', err);
        throw err;
    }
}   
const deleteStudent = async (id) => {
    try {
        const result = await client.query('DELETE FROM students WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    } catch (err) {
        console.error('Error deleting content:', err);
        throw err;
    }
}
module.exports = {
    getAllStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent
};