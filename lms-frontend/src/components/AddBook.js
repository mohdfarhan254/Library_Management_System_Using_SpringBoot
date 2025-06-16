import React, { useState } from 'react';

function AddBook() {
  const [book, setBook] = useState({ title: '', author: '', isbn: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!book.title || !book.author || !book.isbn) {
      alert('⚠️ All fields are required.');
      return;
    }

    try {
      setLoading(true);
      const res = await fetch('http://localhost:8080/api/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });

      if (res.ok) {
        alert('✅ Book added successfully!');
        setBook({ title: '', author: '', isbn: '' }); // Clear form
      } else {
        const errorText = await res.text();
        alert('❌ Failed to add book: ' + errorText);
      }
    } catch (error) {
      alert('❌ Server error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', paddingTop: '2rem' }}>
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={book.title}
          onChange={handleChange}
          required
          style={{ display: 'block', margin: '1rem 0', width: '100%' }}
        />
        <input
          name="author"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
          required
          style={{ display: 'block', margin: '1rem 0', width: '100%' }}
        />
        <input
          name="isbn"
          placeholder="ISBN"
          value={book.isbn}
          onChange={handleChange}
          required
          style={{ display: 'block', margin: '1rem 0', width: '100%' }}
        />
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '0.5rem' }}>
          {loading ? 'Adding...' : 'Add Book'}
        </button>
      </form>
    </div>
  );
}

export default AddBook;
