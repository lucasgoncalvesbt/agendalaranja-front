import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Nav from './components/Nav';
import { AuthContextProvider } from './contexts/AuthContext';
import Agendamento from './pages/Agendamento';
import Estacao from './pages/Estacao';
import Home from './pages/Home';
import Login from './pages/Login';

import './styles/css/App.css';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/estacao" exact component={Estacao} />
          <Route path="/login" exact component={Login} />
          <Route path="/agendamento" exact component={Agendamento} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
