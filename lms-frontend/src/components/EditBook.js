import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function EditBook() {
  const { id } = useParams();
  const [book, setBook] = useState({ title: '', author: '', isbn: '' });
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/api/books/${id}`)
      .then(res => res.json())
      .then(data => setBook(data))
      .catch(err => console.error('Error loading book:', err));
  }, [id]);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/api/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    })
      .then(res => res.json())
      .then(() => navigate('/books'))
      .catch(err => console.error('Error updating book:', err));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>✏️ Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={book.title} onChange={handleChange} placeholder="Title" required /><br />
        <input name="author" value={book.author} onChange={handleChange} placeholder="Author" required /><br />
        <input name="isbn" value={book.isbn} onChange={handleChange} placeholder="ISBN" required /><br />
        <button type="submit">Update Book</button>
      </form>
    </div>
  );
}

export default EditBook;
