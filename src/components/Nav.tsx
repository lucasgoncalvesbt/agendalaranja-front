import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import { IoExitOutline } from "react-icons/io5"
import fclogo from '../assets/images/logolaranja.svg';

import '../styles/css/nav.css';

export default function Nav() {
  const { user, logout } = useAuth();
  const { pathname } = useLocation();

  const handlerLogout = () => {
    logout();
  }

  return (
    !(pathname === "/login" || pathname === "/signup") ?
      <header className="">
        <div className="container navbar">
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
            <div className="login">
              <span>Olá, {user.nome}</span>
              <button className="button" onClick={handlerLogout}>< IoExitOutline /></button>
            </div>
          )}
        </div>
      </header>
      : null
  )
}