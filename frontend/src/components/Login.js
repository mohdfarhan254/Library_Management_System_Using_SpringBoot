// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login({ onLogin }) {
  const [user, setUser] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('username', data.username);
        localStorage.setItem('role', data.role);

        alert('✅ Login successful!');
        onLogin(); // Update state in App
        navigate('/home');
      } else {
        const errText = await res.text();
        alert('❌ ' + errText);
      }
    } catch (err) {
      alert('❌ Server error: ' + err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            required
            style={{ width: '100%' }}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Password:</label>
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            required
            style={{ width: '100%' }}
          />
        </div>
        <button type="submit" style={{ marginTop: '15px' }}>Login</button>
      </form>
      <p style={{ marginTop: '10px' }}>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}

export default Login;
