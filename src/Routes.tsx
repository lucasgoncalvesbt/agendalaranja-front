import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Agendamento from "./pages/Agendamento";
import Cadastro from "./pages/Cadastro";
import Estacao from "./pages/Estacao";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default function Routes() {
  const { user, isAuthenticated } = useAuth();

  console.log(user)
  console.log(isAuthenticated)

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
    </Switch>
  )
}