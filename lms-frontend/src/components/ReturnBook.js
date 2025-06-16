import React, { useState } from 'react';

function ReturnBook() {
  const [bookId, setBookId] = useState('');

  const handleReturn = () => {
    fetch(`http://localhost:8080/api/books/${bookId}/return`, {
      method: 'POST'
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => alert("Book returned!"))
      .catch(() => alert("❌ Could not return"));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📗 Return Book</h2>
      <input placeholder="Book ID" value={bookId} onChange={(e) => setBookId(e.target.value)} /><br />
      <button onClick={handleReturn}>Return</button>
    </div>
  );
}

export default ReturnBook;
