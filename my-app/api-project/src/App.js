import axios from 'axios';
import './App.css';
import { useCallback, useEffect, useState } from 'react';


function App() {

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const API = {
    getAll: 'http://localhost:8000/api/user/get-all-user',
    create: 'http://localhost:8000/api/user/create-user',
    getOne: 'http://localhost:8000/api/user/get-user',      
    update: 'http://localhost:8000/api/user/update-user',
    delete: 'http://localhost:8000/api/user/delete-user'  
  };


  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get(API.getAll);
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  }, [API.getAll]);

  useEffect(() => {
  
  }, [fetchUsers]);




  async function viewUser(id) {
    try {
      const res = await axios.get(`${API.getOne}/${id}`);
      setSelectedUser(res.data);
      setShowForm(false);
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  }


  const openForm = async (user = null) => {
    setShowForm(true);
    setSelectedUser(null);
    if (user) {
      setIsEditing(true);

      try {
        const res = await axios.get(`${API.getOne}/${user.id}`);
        setFormData({ name: res.data.name, email: res.data.email, phone: res.data.phone });
        setSelectedUser(user);
      } catch (err) {
        console.error('Error fetching user for edit:', err);
      }
    } else {
      setIsEditing(false);
      setFormData({ name: '', email: '', phone: '' });
    }
  };

 
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const createUser = async () => {
    try {
      await axios.post(API.create, formData);
      fetchUsers();
      setShowForm(false);
      setFormData({ name: '', email: '', phone: '' });
    } catch (err) {
      console.error('Error creating user:', err);
    }
  };

 
  const updateUser = async () => {
    try {
   
      await axios.put(`${API.update}/${selectedUser.id}`, formData);
      fetchUsers();
      setShowForm(false);
      setSelectedUser(null);
      setIsEditing(false);
      setFormData({ name: '', email: '', phone: '' });
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

 
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API.delete}/${id}`);
      fetchUsers();
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Student Records</h2>
      <button onClick={() => openForm()}>Add New Record</button>


      <table border="1" cellPadding="10" style={{ marginTop: 20, borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan="5">No users found.</td></tr>
          ) : (
            users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td><td>{user.name}</td><td>{user.email}</td><td>{user.phone}</td>
                <td>
                  <button onClick={() => viewUser(user.id)}>View</button>
                  <button onClick={() => openForm(user)}>Edit</button>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

   
      {selectedUser && !showForm && (
        <div style={{ marginTop: 20 }}>
          <h3>User Details</h3>
          <p><b>ID:</b> {selectedUser.id}</p>
          <p><b>Name:</b> {selectedUser.name}</p>
          <p><b>Email:</b> {selectedUser.email}</p>
          <p><b>Phone:</b> {selectedUser.phone}</p>
          <button onClick={() => setSelectedUser(null)}>Close</button>
        </div>
      )}


      {showForm && (
        <div style={{marginTop: 20 }}>
          <h3>{isEditing ? 'Edit User' : 'Add New User'}</h3>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          /><br /><br />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          /><br /><br />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          /><br /><br />
          <button onClick={isEditing ? updateUser : createUser}>
            {isEditing ? 'Update' : 'Create'}
          </button>
          <button onClick={() => setShowForm(false)} style={{ marginLeft: 10 }}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default App;
