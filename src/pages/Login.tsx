import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import jwt_decode from "jwt-decode";

import api from '../services/api';

export default function Login() {
  const history = useHistory();
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handlerSubmit(event: FormEvent) {
    event.preventDefault();
    login(email, senha, () => history.push('/'))
  }

  return (
    <div>
      <form onSubmit={handlerSubmit}>
        <input
          type="text"
          placeholder="Digite o Email"
          onChange={event => setEmail(event.target.value)}
          value={email}
        />
        <input
          type="text"
          placeholder="Digite a Senha"
          onChange={event => setSenha(event.target.value)}
          value={senha}
        />
        <button type="submit">Logar</button>
      </form>
    </div>
  );
}