// src/App.js
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  //useNavigate,
} from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import AddBook from './components/AddBook';
import MyBooks from './components/MyBooks';
import EditBook from './components/EditBook';
import Navbar from './components/Navbar';

function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userId'));
  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('userId'));
  }, [location]);

  return (
    <>
      {isLoggedIn && <Navbar onLogout={() => setIsLoggedIn(false)} />}
      <Routes>
        <Route path="/" element={<Navigate to={isLoggedIn ? '/home' : '/login'} />} />
        <Route path="/login" element={!isLoggedIn ? <Login onLogin={() => setIsLoggedIn(true)} /> : <Navigate to="/home" />} />
        <Route path="/signup" element={!isLoggedIn ? <Signup /> : <Navigate to="/home" />} />
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
        <Route path="/add-book" element={isLoggedIn ? <AddBook /> : <Navigate to="/login" />} />
        <Route path="/my-books" element={isLoggedIn ? <MyBooks /> : <Navigate to="/login" />} />
        <Route path="/books/edit/:id" element={isLoggedIn ? <EditBook /> : <Navigate to="/login" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
