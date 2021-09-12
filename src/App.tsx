import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Nav from './components/Nav';
import { AuthContextProvider } from './contexts/AuthContext';
import { useAuth } from './hooks/useAuth';
import Agendamento from './pages/Agendamento';
import Estacao from './pages/Estacao';
import Home from './pages/Home';
import Login from './pages/Login';
import Routes from './Routes';

import './styles/css/App.css';

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Nav />
        <Routes />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
