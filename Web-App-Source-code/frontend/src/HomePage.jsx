import SideNavBar from "./SideNavBar.jsx";
import './styles/HomePage.modules.css';
import React, { useState } from 'react';
import mappings from './assets/carpark_mappings.json';

function HomePage() {

  return (
    <div className="homepage-container">
    <div className='left-container'>
    <SideNavBar />
    </div>
    <div className="main-content">
      <h1>Home Page</h1>
    </div>
  </div>
  );
}

export default HomePage;
