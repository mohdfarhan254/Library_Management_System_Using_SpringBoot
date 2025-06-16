import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser);
    }
  } catch (err) {
    console.error("❌ Failed to parse user from localStorage", err);
    // optional: localStorage.removeItem("user");
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/home">🏠 Home</Link> |{" "}
      <Link to="/books">📚 Books</Link> |{" "}
      <Link to="/add-book">➕ Add Book</Link> |{" "}
      <Link to="/users">👥 All Users</Link> |{" "}
   {user ? (
  <>
    👋 {user.username} | <button onClick={handleLogout}>Logout</button>
  </>
) : (
  <>
    <Link to="/">Login</Link> | <Link to="/signup">Signup</Link>
  </>
)}

    </nav>
  );
}

export default Navbar;
