import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Nav from './components/Nav';
import Agendamento from './pages/Agendamento';
import Estacao from './pages/Estacao';
import Home from './pages/Home';

import './styles/css/App.css';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/estacao" exact component={Estacao} />
        <Route path="/agendamento" exact component={Agendamento} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
