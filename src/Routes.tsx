import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Agendamento from "./pages/Agendamento";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default function Routes() {
  const { isAuthenticated } = useAuth();

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login">
        {isAuthenticated ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route path="/signup">
        {isAuthenticated ? <Redirect to="/" /> : <Cadastro />}
      </Route>
      <Route path="/agendamentos" component={Agendamento} />
      <Route path="" component={Home} />
    </Switch>
  )
}