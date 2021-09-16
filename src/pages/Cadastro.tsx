import React, { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../services/api';

import '../styles/css/cadastro.css';

const Cadastro = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const emailFinal = "@fcamara.com"

  const handlerSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const payload = { nome: nome, sobrenome: sobrenome, email: email + emailFinal, senha: senha };
    console.log(payload);

    try {
      await api.post('/auth/signout', payload)
      history.push("/login");
    } catch (error: any) {
      console.log(error.response.data)
    }
  }

  return (
    <div className="page-signup-overlay">
      <div className="page-signup">
        <h1>Sign Up</h1>
        <form onSubmit={handlerSubmit}>
          <div className="input-group">
            <label htmlFor="nome">Nome</label>
            <input
              id="nome"
              type="text"
              placeholder="Digite seu nome"
              onChange={event => setNome(event.target.value)}
              value={nome}
            />
          </div>
          <div className="input-group">
            <label htmlFor="sobrenome">Sobrenome</label>
            <input
              id="email"
              type="text"
              placeholder="Digite seu sobrenome"
              onChange={event => setSobrenome(event.target.value)}
              value={sobrenome}
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