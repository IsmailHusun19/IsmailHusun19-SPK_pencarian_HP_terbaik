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
import Team from './pages/Team';
import FormEditData from './pages/FormEditData';
import PageNotFound from './pages/PageNotFound';
import EditSelection from './pages/EditSelection';

function App() {
  return (
    <Router>
      <AppContent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<FormInputData />} />
        <Route path="/login" element={<Login />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Table />} />
        <Route path="/team" element={<Team />} />
        <Route path="/editdata/:id" element={<FormEditData />} />
        <Route path="/selection" element={<EditSelection />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const currentURL = location.pathname;
  const checking = !['/login', '/', '/signup', '/aboutus', '/team'].includes(currentURL);

  return (
    <>
      {checking && <Navbar />}
    </>
  );
}

export default App;
