import React, { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import '../styles/css/login.css';

export default function Login() {
  const history = useHistory();
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handlerSubmit(event: FormEvent) {
    event.preventDefault();
    await login(email, senha, () => history.push('/estacao'))
  }

  return (
    <div className="page-login-overlay">
      <div className="page-login">
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
        <p>Não possui conta? <Link to="/logout">Cadastre-se aqui</Link>.</p>
      </div>
    </div>
  );
}