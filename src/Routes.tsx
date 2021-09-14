import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Agendamento from "./pages/Agendamento";
import Cadastro from "./pages/Cadastro";
import Estacao from "./pages/Estacao";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default function Routes() {
  const { user } = useAuth();

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/estacoes" component={Estacao} />
      <Route exact path="/login">
        {user ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route exact path="/signup">
        {user ? <Redirect to="/" /> : <Cadastro />}
      </Route>
      <Route exact path="/agendamentos">
        {!user ? <Redirect to="/login" /> : <Agendamento />}
      </Route>
    </Switch>
  )
}