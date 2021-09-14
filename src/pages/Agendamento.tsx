import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

import '../styles/css/agendamento.css';

type Agendamento = {
  id: string;
  nomeConsultor: string,
  emailConsultor: string,
  estacaoId: number,
  dataAgendada: string;
}

export default function Agendamento() {
  const { user } = useAuth();
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  useEffect(() => {
    const onLoad = async () => {

      const token = localStorage.getItem('token');
      const response = await api.get('/agendamento?emailConsultor=' + user?.email, { headers: { Authorization: 'Bearer ' + token } })
      setAgendamentos(response.data);
      console.log(response);
    }
    onLoad();
  }, [])

  const listItems = agendamentos.map((agendamento) => {
    return (
      <li key={agendamento.id}>id: {agendamento.id}</li>
    )
  })

  return (
    <div className="page-agendamentos-overlay">
      <div className="container page-agendamentos">
        <h1>Meus Agendamentos</h1>
        <ul>{listItems}</ul>
      </div>
    </div>
  );
}