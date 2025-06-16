import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/api/books')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch books');
        }
        return res.json();
      })
      .then((data) => setBooks(data))
      .catch((err) => {
        console.error(err);
        alert("❌ Couldn't load books.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      fetch(`http://localhost:8080/api/books/${id}`, { method: 'DELETE' })
        .then(() => setBooks(books.filter(b => b.id !== id)))
        .catch(err => {
          console.error(err);
          alert('❌ Failed to delete');
        });
    }
  };

  if (loading) return <p style={{ padding: '2rem' }}>⏳ Loading books...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📚 Book List</h2>
      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {books.map((b) => (
            <li key={b.id} style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
              <strong>{b.title}</strong> by {b.author} <br />
              <small>ISBN: {b.isbn}</small>
              <div style={{ marginTop: '0.5rem' }}>
                <button onClick={() => handleDelete(b.id)} style={{ marginRight: '10px' }}>🗑️ Delete</button>
                <button onClick={() => navigate(`/edit-book/${b.id}`)}>✏️ Edit</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BookList;
