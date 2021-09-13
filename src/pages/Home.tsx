import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import UIModal from '../components/Modal';
import { useAuth } from '../hooks/useAuth';

import '../styles/css/home.css';

export default function Home() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handlerClickOpen = () => {
    setIsOpen(true);
  }

  const handlerClose = () => {
    setIsOpen(false);
  }

  return (
    <div className="page-home-overlay">
      <div className="page-home">
        <main>
          <p>O jeito mais fácil, rápido e prático de agendar o seu espaço de trabalho.</p>
          <Link to="/" className="button"> Agendar </Link>
          <button className="button" onClick={handlerClickOpen}>modal</button>
        </main>
        <UIModal isOpen={isOpen} onClickClose={handlerClose}>
          <h1>Modal</h1>
        </UIModal>
      </div>
    </div>
  );
}