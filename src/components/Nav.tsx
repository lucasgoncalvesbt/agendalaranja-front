import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import fclogo from '../assets/images/fclogo2.png';

import '../styles/css/nav.css';

export default function Nav() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  function handlerLogout() {
    logout();
  }

  return (
    !(pathname == "/login" || pathname == "/logout") ?
      <nav className="">
        <Link to="/">
          <img src={fclogo} alt="Logo da FCamara" />
        </Link>
        {!user ? (
          <Link to="/login" className="button">Entrar</Link>
        ) : (
          <button className="button" onClick={handlerLogout}>Logout</button>
        )}
      </nav>
      : null
  )
}