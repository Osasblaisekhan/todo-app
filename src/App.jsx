import React from 'react'
import AddPerson from './components/AddPerson';
import NavBar from './components/navBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
const App = () => {
  return (
    <div>
      <Router>
      <NavBar />
      <div className='container-box'>
        <AddPerson />
      <ToastContainer />
      </div>
      </Router>
    </div>
  )
}

export default App
