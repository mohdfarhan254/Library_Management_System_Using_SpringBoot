// src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const [user, setUser] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8080/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        alert('✅ Signup successful!');
        navigate('/login');
      } else {
        const error = await res.text();
        alert('❌ ' + error);
      }
    } catch (err) {
      alert('❌ Server Error: ' + err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
            style={{ width: '100%' }}
          />
        </div>
        <button type="submit" style={{ marginTop: '15px' }}>Signup</button>
      </form>
      <p style={{ marginTop: '10px' }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;
