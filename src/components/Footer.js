import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery/src/jquery';

const Footer = () => {
  return (
    <footer className="text-center bg-dark">
      <div className="container text-white py-4 py-lg-5">
        <ul className="list-inline">
          <li className="list-inline-item me-4"><a className="link-light" href="https://is.gd/f5I7lE" target="_blank" rel="noreferrer">School</a></li>
          <li className="list-inline-item me-4"><a className="link-light" href="https://github.com/medichat-ai" target="_blank" rel="noreferrer">GitHub</a></li>
          <li className="list-inline-item"><a className="link-light" href="https://runpod.io" target="_blank" rel="noreferrer">GPU Hosting</a></li>
        </ul>
        <p className="mb-0" style={{ color: 'white' }}>Copyright © 2024 MediChat</p>
      </div>
    </footer>
  );
};

export default Footer;