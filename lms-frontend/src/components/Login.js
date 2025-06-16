import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const data = await res.text(); // or res.json() based on backend
        // ✅ Save user to localStorage
        localStorage.setItem("user", JSON.stringify({ username: form.username }));
        alert("✅ Login successful");
        navigate('/home');
      } else {
        const msg = await res.text();
        alert("❌ Login failed: " + msg); // helpful for debugging
      }
    } catch (error) {
      alert("❌ Server error: " + error.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🔐 Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <br /><br />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
