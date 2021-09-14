import React, { FormEvent, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import UIModal from '../components/Modal';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

import '../styles/css/home.css';

type User = {
  id: number;
  nome: string;
  email: string;
}

export default function Home() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handlerClickOpen = () => {
    setIsOpen(true);
  }

  const handlerClose = () => {
    setIsOpen(false);
  }

  const [estacao, setEstacao] = useState('');
  const [dataAgendada, setDataAgendada] = useState('');

  const handlerSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data = dataAgendada.split('-').reverse().join('-');
    const payload = { estacaoId: estacao, dataAgendada: data, nomeConsultor: user?.nome, emailConsultor: user?.email };

    const token = localStorage.getItem('token');

    //await api.post('/agendamento', payload, { headers: { Authorization: 'Bearer ' + token } })
    //  .then(response => console.log(response))
    //  .catch(err => console.log(err.response.data));
    try {
      const response = await api.post('/agendamento', payload, { headers: { Authorization: 'Bearer ' + token } })
      console.log(response.data)
    } catch (error: any) {
      console.log(error.response.data)
    }
  }

  return (
    <div className="page-home-overlay">
      <div className="container page-home">
        <div className={"home-intro-tittle"}>
          <p>Você de volta ao seu espaço de trabalho!</p>
          <Link to="/" className="button"> Agendar </Link>
          <button className="button" onClick={handlerClickOpen}>modal</button>
        </div>
        <div className={"home-intro-image"}>
          a
        </div>


        <UIModal isOpen={isOpen} onClickClose={handlerClose}>
          <form onSubmit={handlerSubmit}>
            <div>
              <input type="text" value={user?.nome} disabled />
            </div>
            <div>
              <input type="text" value={user?.email} disabled />
            </div>
            <div>
              <input type="text" onChange={event => setEstacao(event.target.value)} />
            </div>
            <div>
              <input type="date" onChange={event => setDataAgendada(event.target.value)} />
            </div>
            <button className="button">Agendar</button>
          </form>
        </UIModal>
      </div>
    </div>
  );
}