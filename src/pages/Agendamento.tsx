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
import SucessoModal from '../components/SucessoModal';
import ErrorModal from '../components/ErrorModal';

type Escritorio = {
  id: number;
  local: string;
  capacidade: number;
}

type Estacao = {
  id: number;
  qtdLugares: number;
  escritorioId: number;
}

type Agendamento = {
  id: string;
  nomeConsultor: string,
  emailConsultor: string,
  estacaoId: number,
  dataAgendada: string;
  escritorioName: string
}

export default function Agendamento() {
  const { user, isAuthenticated } = useAuth();
  const [escritorios, setEscritorios] = useState<Escritorio[]>([]);
  const [estacoes, setEstacoes] = useState<Estacao[]>([]);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [estacao, setEstacao] = useState('');
  const [dataAgendada, setDataAgendada] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const [sucessoIsOpen, setSucessoIsOpen] = useState(false);
  const [errorIsOpen, setErrorIsOpen] = useState(false);

  useEffect(() => {
    const onLoad = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        const agendamentosResponse = await api.get('/agendamento?emailConsultor=' + user?.email, { headers: { Authorization: 'Bearer ' + token } })
        setAgendamentos(agendamentosResponse.data);
        const escritoriosResponse = await api.get('/escritorio', { headers: { Authorization: 'Bearer ' + token } })
        setEscritorios(escritoriosResponse.data);
        console.log(escritoriosResponse.data);
      }
    }
    onLoad();
  }, [isAuthenticated])

  const handlerSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data = dataAgendada.split('-').reverse().join('-');
    const payload = { estacaoId: estacao, dataAgendada: data, nomeConsultor: user?.nome, emailConsultor: user?.email };

    const token = localStorage.getItem('token');

    //setIsOpen(false);
    //setSucessoIsOpen(true);
    console.log()
    try {
      //const response = await api.post('/agendamento', payload, { headers: { Authorization: 'Bearer ' + token } })
      //console.log(response.data)
    } catch (error: any) {
      console.log(error.response.data)
    }
  }

  const handlerEstacoes = async (id: string) => {
    const token = localStorage.getItem('token');

    if (token) {
      const estacoesResponse = await api.get('/estacao?escritorioId=' + id, { headers: { Authorization: 'Bearer ' + token } })
      setEstacoes(estacoesResponse.data);
      console.log(estacoesResponse.data)
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
            <select onChange={event => handlerEstacoes(event.target.value)}>
              <option value="">Todas</option>
              {escritorios.map((escritorio => {
                return <option key={escritorio.id} value={escritorio.id}>{escritorio.local}</option>
              }))}
            </select>
          </div>
          <div>
            <select onChange={event => console.log(event.target.value)}>
              {estacoes.map((estacao => {
                return <option key={estacao.id} value={estacao.id}>{estacao.id}</option>
              }))}
            </select>
          </div>
          <div>
            <input type="date" onChange={event => setDataAgendada(event.target.value)} />
          </div>
          <button className="button">Agendar</button>
        </form>
      </UIModal>
      <SucessoModal sucessoIsOpen={sucessoIsOpen} onClickClose={() => {
        setSucessoIsOpen(false);
        window.location.reload();
      }} >
        <h1>Sucesso</h1>
      </SucessoModal>
      <ErrorModal errorIsOpen={errorIsOpen} onClickClose={() => { setErrorIsOpen(false) }} >
        <h1>Sucesso</h1>
      </ErrorModal>
    </div>
  );
}