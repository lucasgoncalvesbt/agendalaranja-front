import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import Agendamento from "./pages/Agendamento";
import Estacao from "./pages/Estacao";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default function Routes() {
  const { user } = useAuth();

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/estacao" exact component={Estacao} />
      <Route exact path="/login">
        {user ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route exact path="/agendamento">
        {!user ? <Redirect to="/login" /> : <Agendamento />}
      </Route>
    </Switch>
  )
}