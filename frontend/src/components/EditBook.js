// src/components/EditBook.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditBook() {
  const { id } = useParams();
  const userId = localStorage.getItem('userId');
  const [book, setBook] = useState({ title: '', author: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/books/${id}?userId=${userId}`);
        const data = await res.json();
        setBook(data);
      } catch (err) {
        alert('❌ Failed to fetch book');
      }
    };

    fetchBook();
  }, [id, userId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:8080/api/books/${id}?userId=${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      });

      if (res.ok) {
        alert('✅ Book updated!');
        navigate('/my-books');
      } else {
        const msg = await res.text();
        alert('❌ ' + msg);
      }
    } catch (err) {
      alert('❌ Update error');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h3>Edit Book</h3>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Title"
          value={book.title}
          onChange={(e) => setBook({ ...book, title: e.target.value })}
          required
          style={inputStyle}
        />
        <br />
        <input
          type="text"
          placeholder="Author"
          value={book.author}
          onChange={(e) => setBook({ ...book, author: e.target.value })}
          required
          style={inputStyle}
        />
        <br />
        <button type="submit" style={btnStyle}>Update Book</button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '8px',
  marginBottom: '15px',
  fontSize: '16px',
};

const btnStyle = {
  padding: '10px 16px',
  fontSize: '16px',
  cursor: 'pointer',
};

export default EditBook;
