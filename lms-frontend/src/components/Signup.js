import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Attempting signup with", form);

    try {
      const res = await fetch('http://localhost:8080/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const text = await res.text();
      console.log("Response:", res.status, text);

      if (res.ok) {
        alert('✅ Signup successful!');
        navigate('/');
      } else {
        alert('❌ Signup failed: ' + text);
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert('❌ Server Error: ' + error.message);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🔐 Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <br /><br />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <br /><br />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
