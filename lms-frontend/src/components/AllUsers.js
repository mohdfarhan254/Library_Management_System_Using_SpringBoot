// src/components/AllUsers.js

import React, { useEffect, useState } from 'react';

function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🧠 Fetch all users
  const fetchUsers = () => {
    setLoading(true);
    fetch('http://localhost:8080/api/users')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then((data) => setUsers(data))
      .catch((err) => {
        console.error(err);
        alert('❌ Could not load users');
      })
      .finally(() => setLoading(false));
  };

  // ⚡ Delete user by ID
  const handleDelete = (id) => {
    const confirm = window.confirm('Are you sure you want to delete this user?');
    if (!confirm) return;

    fetch(`http://localhost:8080/api/users/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (res.ok) {
          alert('✅ User deleted successfully!');
          fetchUsers(); // Refresh user list
        } else {
          throw new Error('Delete failed');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('❌ Failed to delete user');
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p style={{ padding: '2rem' }}>⏳ Loading users...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>👥 All Registered Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>
                  <button onClick={() => handleDelete(u.id)} style={{ color: 'red' }}>
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AllUsers;
