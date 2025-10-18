import React from 'react';
import Time from './Time';
import './navBar.css';

const NavBar = () => {
  return (
    <div className='container-nav'>
      <nav>
        <h2>SIMPLE TODO APP WITH MERN STACK</h2>
        <Time />
      </nav>
    </div>
  )
}

export default NavBar
