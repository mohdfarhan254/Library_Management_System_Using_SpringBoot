// src/components/Home.js
import React from 'react';

function Home() {
  const username = localStorage.getItem('username');

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>📚 Welcome, {username}!</h2>
      <p style={textStyle}>This is your <strong>Library Management System</strong> dashboard.</p>
    </div>
  );
}

const containerStyle = {
  padding: '40px',
  textAlign: 'center',
};

const headingStyle = {
  fontSize: '28px',
  marginBottom: '20px',
};

const textStyle = {
  fontSize: '18px',
  color: '#333',
};

export default Home;
