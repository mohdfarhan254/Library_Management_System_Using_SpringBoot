// src/components/AddBook.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddBook() {
  const [book, setBook] = useState({ title: '', author: '' });
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:8080/api/books?userId=${userId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      });

      if (res.ok) {
        alert('✅ Book added successfully!');
        navigate('/my-books');
      } else {
        const err = await res.text();
        alert('❌ ' + err);
      }
    } catch (err) {
      alert('❌ Server error: ' + err.message);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: '20px' }}>📘 Add a New Book</h2>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          type="text"
          placeholder="Title"
          value={book.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })}
          required
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Author"
          value={book.author}
          onChange={(e) => setBook({ ...book, author: e.target.value })}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Add Book</button>
      </form>
    </div>
  );
}

const containerStyle = {
  maxWidth: '400px',
  margin: '50px auto',
  textAlign: 'center',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
};

const buttonStyle = {
  padding: '10px',
  fontSize: '16px',
  cursor: 'pointer',
};

export default AddBook;
