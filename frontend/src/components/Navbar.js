// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();      // Clear login state
    onLogout();                // Notify App to update state
    navigate('/login');        // Redirect to login page
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#282c34',
      color: 'white'
    }}>
      <div>
        <Link to="/home" style={linkStyle}>Home</Link>
        <Link to="/add-book" style={linkStyle}>Add Book</Link>
        <Link to="/my-books" style={linkStyle}>My Books</Link>
      </div>
      <button onClick={handleLogout} style={logoutButtonStyle}>
        Logout
      </button>
    </nav>
  );
}

const linkStyle = {
  marginRight: '15px',
  textDecoration: 'none',
  color: 'white',
  fontWeight: 'bold',
};

const logoutButtonStyle = {
  backgroundColor: '#ff4d4f',
  border: 'none',
  padding: '6px 12px',
  color: 'white',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Navbar;
