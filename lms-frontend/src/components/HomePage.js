import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("❌ Error parsing user:", err);
      navigate("/"); // fallback if corrupted or invalid
    }
  }, [navigate]);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📚 Welcome {user ? user.username : ''} to the Library Management System</h1>
      <p>This is your home dashboard. From here, you can:</p>
      <ul>
        <li onClick={() => navigate('/books')} style={{ cursor: 'pointer', color: 'blue' }}>
          🔍 View the list of available books
        </li>
        <li onClick={() => navigate('/add-book')} style={{ cursor: 'pointer', color: 'green' }}>
          ➕ Add a new book to the library
        </li>
       
      </ul>
    </div>
  );
}

export default HomePage;
