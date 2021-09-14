import React, { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

import { FiPlus } from 'react-icons/fi';
import { MdLocationOn } from 'react-icons/md';
import { FaCalendarAlt } from 'react-icons/fa';
import { GiTable } from 'react-icons/gi';

import '../styles/css/agendamento.css';
import UIModal from '../components/Modal';

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
  const [estacao, setEstacao] = useState('');
  const [dataAgendada, setDataAgendada] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onLoad = async () => {

      const token = sessionStorage.getItem('token');
      const response = await api.get('/agendamento?emailConsultor=' + user?.email, { headers: { Authorization: 'Bearer ' + token } })
      setAgendamentos(response.data);
      console.log(response);
    }
    onLoad();
  }, [])

  const handlerSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data = dataAgendada.split('-').reverse().join('-');
    const payload = { estacaoId: estacao, dataAgendada: data, nomeConsultor: user?.nome, emailConsultor: user?.email };

    const token = sessionStorage.getItem('token');

    //await api.post('/agendamento', payload, { headers: { Authorization: 'Bearer ' + token } })
    //  .then(response => console.log(response))
    //  .catch(err => console.log(err.response.data));
    try {
      const response = await api.post('/agendamento', payload, { headers: { Authorization: 'Bearer ' + token } })
      console.log(response.data)
      window.location.reload();
    } catch (error: any) {
      console.log(error.response.data)
    }
  }

  const agendamentosList = agendamentos.map((agendamento) => {
    return (
      <div className="agendamento-card" key={agendamento.id}>
        <div className="card-body">
          <h5 className="agendamento">Agendamento Confirmado</h5>
          <ul className="card-list">
            <li><MdLocationOn /> Escritório</li>
            <li><FaCalendarAlt /> {agendamento.dataAgendada.split('-').join('/')}</li>
            <li><GiTable /> Estação {agendamento.estacaoId}</li>
          </ul>
        </div>
      </div>
    )
  })

  return (
    <div className="page-agendamentos-overlay">
      <div className="container page-agendamentos">
        <div className="title-button">
          <h1>Meus Agendamentos</h1>
          <button className="button" onClick={() => setIsOpen(true)}><FiPlus /> Novo</button>
        </div>
        <div className="agendamentos-list">
          {agendamentosList.length > 0 ? agendamentosList :
            <h3 className="">Não há agendamentos</h3>
          }
        </div>
      </div>

      <UIModal isOpen={isOpen} onClickClose={() => setIsOpen(false)}>
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
  );
}