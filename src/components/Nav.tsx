import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import fclogo from '../assets/images/logo.svg';

import '../styles/css/nav.css';

export default function Nav() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  const handlerLogout = () => {
    logout();
  }

  const handlerAgendamentos = () => {
    return (<li><Link to="/estacoes" >Estações</Link></li>)
  }

  return (
    !(pathname === "/login" || pathname === "/signup") ?
      <header className="">
        <Link to="/">
          <img src={fclogo} alt="Logo da FCamara" />
        </Link>
        <nav>
          <ul>
            <li><Link to="/escritorios" >Home</Link></li>
            <li><Link to="/estacoes" >Estações</Link></li>
            <li><Link to="/agendamentos" >Agendamentos</Link></li>
          </ul>
        </nav>
        {!user ? (
          <Link to="/login" className="button">Entrar</Link>
        ) : (
          <button className="button" onClick={handlerLogout}>Logout</button>
        )}
      </header>
      : null
  )
}