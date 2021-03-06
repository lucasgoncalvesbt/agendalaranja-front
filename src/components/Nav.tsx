import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import { IoExitOutline } from "react-icons/io5"
import agendaLaranjaFC from '../assets/images/logoagendalaranja.svg';

import '../styles/css/nav.css';

export default function Nav() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  const handlerLogout = () => {
    logout();
  }

  return (
    <header className="">
      <div className="container navbar">
        <Link to="/">
          <img src={agendaLaranjaFC} alt="Logo da FCamara" />
        </Link>
        <nav>
          <ul>
            <li><Link to="/" >Home</Link></li>
            <li><Link to="" >Estações (em breve)</Link></li>
            <li><Link to="/agendamentos" >Agendamentos</Link></li>
          </ul>
        </nav>
        {!user ? (
          <Link to="/login" className="button" title="Logar" >Entrar</Link>
        ) : (
          <div className="login">
            <span>Olá, {user.nome}</span>
            <button className="button padding-0" onClick={handlerLogout} title="Sair da conta">< IoExitOutline /></button>
          </div>
        )}
      </div>
    </header>
  )
}