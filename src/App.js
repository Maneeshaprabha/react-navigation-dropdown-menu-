import React from 'react';
import Navbar from './components/Navbar';
import './App.css';

const App = () => {
  return (
    <header className="App-header">
      <div className="nav-area">
        <a href="/#" className="logo">
          Maneesha Herath
        </a>
        <Navbar />
      </div>
    </header>
  );
};

export default App;
