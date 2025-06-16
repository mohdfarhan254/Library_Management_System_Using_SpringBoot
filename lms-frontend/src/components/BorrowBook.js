import React, { useState } from 'react';

function BorrowBook() {
  const [bookId, setBookId] = useState('');
  const [userId, setUserId] = useState('');

  const handleBorrow = () => {
    fetch(`http://localhost:8080/api/books/${bookId}/borrow/${userId}`, {
      method: 'POST'
    })
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(() => alert("Book borrowed!"))
      .catch(() => alert("❌ Could not borrow"));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📕 Borrow Book</h2>
      <input placeholder="Book ID" value={bookId} onChange={(e) => setBookId(e.target.value)} /><br />
      <input placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} /><br />
      <button onClick={handleBorrow}>Borrow</button>
    </div>
  );
}

export default BorrowBook;
