import React, { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import '../styles/css/login.css';

export default function Login() {
  const history = useHistory();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const emailFinal = "@fcamara.com"

  const handlerSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await login(email + emailFinal, senha, () => history.push('/'))
  }

  return (
    <div className="page-login-overlay">
      <div className="page-login">
        <h1>Login</h1>
        <form onSubmit={handlerSubmit}>
          <div className="input-group">
            <label htmlFor="name">Email</label>
            <div className="input-group-email">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Digite o Email"
                onChange={event => setEmail(event.target.value)}
                value={email}
              />
              <span>{emailFinal}</span>
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              placeholder="Digite a Senha"
              onChange={event => setSenha(event.target.value)}
              value={senha}
            />
          </div>
          <button className="button" type="submit">Logar</button>
        </form>
        <p>Não possui conta? <Link to="/signup">Cadastre-se aqui</Link>.</p>
      </div>
    </div>
  );
}