import React, { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

import { FiPlus } from 'react-icons/fi';
import { MdLocationOn } from 'react-icons/md';
import { FaCalendarAlt } from 'react-icons/fa';
import { GiTable } from 'react-icons/gi';

import '../styles/css/agendamento.css';
import UIModal from '../components/Modal';
import { Link, useHistory } from 'react-router-dom';

type Agendamento = {
  id: string;
  nomeConsultor: string,
  emailConsultor: string,
  estacaoId: number,
  dataAgendada: string;
  escritorioName: string
}

export default function Agendamento() {
  const history = useHistory();
  const { user, logout, isAuthenticated } = useAuth();
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [estacao, setEstacao] = useState('');
  const [dataAgendada, setDataAgendada] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onLoad = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        const response = await api.get('/agendamento?emailConsultor=' + user?.email, { headers: { Authorization: 'Bearer ' + token } })
        setAgendamentos(response.data);
        console.log(response);
      }
    }
    onLoad();
  }, [isAuthenticated])

  const handlerSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data = dataAgendada.split('-').reverse().join('-');
    const payload = { estacaoId: estacao, dataAgendada: data, nomeConsultor: user?.nome, emailConsultor: user?.email };

    const token = localStorage.getItem('token');
    try {
      const response = await api.post('/agendamento', payload, { headers: { Authorization: 'Bearer ' + token } })
      console.log(response.data)
      window.location.reload();
    } catch (error: any) {
      console.log(error.response.data)
    }
  }

  const handlerCancel = async (agendamentoId: string) => {
    const token = localStorage.getItem('token');
    try {
      const response = await api.delete(`/agendamento/${agendamentoId}`, { headers: { Authorization: 'Bearer ' + token } })
      console.log(response.data)
      window.location.reload();
    } catch (error: any) {
      console.log(error.response.data)
    }
  }

  const renderMensagem = () => {
    if (isAuthenticated && agendamentos.length === 0) {
      return (
        <>Não há agendamentos no momento!</>
      )
    } else if (!isAuthenticated) {
      return (
        <>Você não está  logado, <Link to='/login'>entre aqui.</Link></>
      )
    }
  }

  const agendamentosList = agendamentos.map((agendamento) => {
    return (
      <div className="agendamento-card" key={agendamento.id}>
        <div className="card-body">
          <h5 className="agendamento">Agendamento Confirmado</h5>
          <ul className="card-list">
            <li><MdLocationOn /> {agendamento.escritorioName}</li>
            <li><FaCalendarAlt /> {agendamento.dataAgendada.split('-').join('/')}</li>
            <li><GiTable /> Estação {agendamento.estacaoId}</li>
          </ul>
          <button className="button" onClick={() => handlerCancel(agendamento.id)}>Cancelar</button>
        </div>
      </div>
    )
  })

  return (
    <div className="page-agendamentos-overlay">
      <div className="container page-agendamentos">
        <div className="title-button">
          <h1>Meus Agendamentos</h1>
          {isAuthenticated ? <button className="button" onClick={() => setIsOpen(true)}><FiPlus /> Novo</button> : null}
        </div>
        <div className="agendamentos-list">
          {agendamentos.length > 0 ? agendamentosList : <h3 className="">{renderMensagem()}</h3>}
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