// src/components/MyBooks.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function MyBooks() {
  const [books, setBooks] = useState([]);
  const userId = localStorage.getItem('userId');

  // Fetch books when component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/books?userId=${userId}`);
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        alert('❌ Failed to fetch books');
      }
    };

    fetchBooks();
  }, [userId]);

  // Delete a book
  const deleteBook = async (bookId) => {
    try {
      await fetch(`http://localhost:8080/api/books/${bookId}?userId=${userId}`, {
        method: 'DELETE',
      });
      alert('✅ Book deleted');
      setBooks((prev) => prev.filter((book) => book.id !== bookId));
    } catch (err) {
      alert('❌ Error deleting book');
    }
  };

  // Borrow a book
  const borrowBook = async (bookId) => {
    try {
      const res = await fetch(`http://localhost:8080/api/books/${bookId}/borrow?userId=${userId}`, {
        method: 'POST',
      });
      if (res.ok) {
        alert('✅ Book borrowed');
        refreshBooks();
      } else {
        const msg = await res.text();
        alert('❌ ' + msg);
      }
    } catch (err) {
      alert('❌ Borrow error');
    }
  };

  // Return a book
  const returnBook = async (bookId) => {
    try {
      const res = await fetch(`http://localhost:8080/api/books/${bookId}/return?userId=${userId}`, {
        method: 'POST',
      });
      if (res.ok) {
        alert('✅ Book returned');
        refreshBooks();
      } else {
        const msg = await res.text();
        alert('❌ ' + msg);
      }
    } catch (err) {
      alert('❌ Return error');
    }
  };

  // Refresh the books from server
  const refreshBooks = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/books?userId=${userId}`);
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      alert('❌ Failed to refresh books');
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: '20px' }}>📚 My Books</h2>
      {books.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {books.map((book) => (
            <li key={book.id} style={cardStyle}>
              <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                {book.title} <span style={{ fontWeight: 'normal' }}>by {book.author}</span>
              </div>
              <div style={actionRow}>
                <Link to={`/books/edit/${book.id}`} style={linkStyle} aria-label="Edit Book">
                  ✏️ Edit
                </Link>
                <button onClick={() => deleteBook(book.id)} style={dangerBtn} aria-label="Delete Book">
                  🗑️ Delete
                </button>
                {book.borrowed ? (
                  <button onClick={() => returnBook(book.id)} style={primaryBtn} aria-label="Return Book">
                    🔁 Return
                  </button>
                ) : (
                  <button onClick={() => borrowBook(book.id)} style={successBtn} aria-label="Borrow Book">
                    📖 Borrow
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// 🔵 Styling
const containerStyle = {
  padding: '20px',
  maxWidth: '800px',
  margin: 'auto',
  fontFamily: 'Segoe UI, sans-serif',
};

const cardStyle = {
  marginBottom: '15px',
  padding: '15px',
  border: '1px solid #ccc',
  borderRadius: '10px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
};

const actionRow = {
  marginTop: '10px',
  display: 'flex',
  gap: '10px',
  flexWrap: 'wrap',
};

const btnBase = {
  padding: '6px 12px',
  fontSize: '14px',
  borderRadius: '5px',
  cursor: 'pointer',
  border: 'none',
};

const primaryBtn = {
  ...btnBase,
  backgroundColor: '#007bff',
  color: 'white',
};

const successBtn = {
  ...btnBase,
  backgroundColor: '#28a745',
  color: 'white',
};

const dangerBtn = {
  ...btnBase,
  backgroundColor: '#dc3545',
  color: 'white',
};

const linkStyle = {
  ...btnBase,
  backgroundColor: '#f0f0f0',
  textDecoration: 'none',
  color: '#333',
};

export default MyBooks;
