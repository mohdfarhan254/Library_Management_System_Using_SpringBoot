import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import HomePage from './components/HomePage';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import AllUsers from './components/AllUsers';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-book/:id" element={<EditBook />} />
        <Route path="/users" element={<AllUsers />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
