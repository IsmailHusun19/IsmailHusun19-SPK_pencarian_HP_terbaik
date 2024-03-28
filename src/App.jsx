import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './component/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import FormInputData from './pages/InputData';
import Footer from './component/Footer';
import SignUp from './pages/SignUp';
import Table from './component/Table';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<FormInputData />} />
        <Route path="/login" element={<Login />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Table />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
