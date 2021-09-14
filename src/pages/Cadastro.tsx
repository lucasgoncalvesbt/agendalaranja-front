import React, { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

import '../styles/css/cadastro.css';

const Cadastro = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const emailFinal = "@fcamara.com"

  const handlerSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const payload = { nome: nome, email: email + emailFinal, senha: senha };
    console.log(payload);

    const token = localStorage.getItem('token');
    try {
      const response = await api.post('/auth/signout', payload, { headers: { Authorization: 'Bearer ' + token } })
      console.log(response.data)
    } catch (error: any) {
      console.log(error.response.data)
    }

    history.push("/login");
  }

  return (
    <div className="page-signup-overlay">
      <div className="page-signup">
        <h1>Sign Up</h1>
        <form onSubmit={handlerSubmit}>
          <div className="input-group">
            <label>Nome</label>
            <input
              type="text"
              placeholder="Digite seu nome"
              onChange={event => setNome(event.target.value)}
              value={nome}
            />
          </div>
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
            <label>Senha</label>
            <input
              type="password"
              placeholder="Digite a Senha"
              onChange={event => setSenha(event.target.value)}
              value={senha}
            />
          </div>
          <button className="button" type="submit">Cadastrar-se</button>
        </form>
        <p>Já possui uma conta? <Link to="/login">Entre aqui</Link>.</p>
      </div>
    </div>
  )
}

export default Cadastro;