import React, { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../hooks/useAuth';
import api from '../services/api';

import UIModal from '../components/Modal';
import SucessoModal from '../components/SucessoModal';
import ErrorModal from '../components/ErrorModal';

import { FiPlus } from 'react-icons/fi';
import { MdLocationOn } from 'react-icons/md';
import { ImCalendar } from 'react-icons/im'
import { FaCalendarAlt } from 'react-icons/fa';
import { GiTable } from 'react-icons/gi';

import '../styles/css/agendamento.css';

type EscritorioType = {
  id: number;
  local: string;
  capacidade: number;
}

type EstacaoType = {
  id: number;
  qtdLugares: number;
  escritorioId: number;
}

type AgendamentoType = {
  id: string;
  nomeConsultor: string,
  emailConsultor: string,
  estacaoId: number,
  dataAgendada: string;
  escritorioName: string
}

const Agendamento = () => {
  const { user, isAuthenticated } = useAuth();
  const [escritorios, setEscritorios] = useState<EscritorioType[]>([]);
  const [estacoes, setEstacoes] = useState<EstacaoType[]>([]);
  const [agendamentos, setAgendamentos] = useState<AgendamentoType[]>([]);
  const [estacao, setEstacao] = useState('');
  const [dataAgendada, setDataAgendada] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const [sucessoIsOpen, setSucessoIsOpen] = useState(false);
  const [errorIsOpen, setErrorIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');



  useEffect(() => {
    const onLoad = async () => {
      const agendamentosResponse = await api.get('/agendamento?emailConsultor=' + user?.email);
      setAgendamentos(agendamentosResponse.data);
      const escritoriosResponse = await api.get('/escritorio');
      setEscritorios(escritoriosResponse.data);
    }
    onLoad();
    handlerGetData();
  }, [isAuthenticated])

  const handlerSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const data = dataAgendada.split('-').reverse().join('-');
    const payload = { estacaoId: estacao, dataAgendada: data, nomeConsultor: user?.nome, emailConsultor: user?.email };

    try {
      const response = await api.post('/agendamento', payload);
      console.log(response.data);
      setIsOpen(false);
      setSucessoIsOpen(true);
    } catch (error: any) {
      console.log(error.response.data)
      setErrorMessage(error.response.data.message);
      setErrorIsOpen(true);
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
    return (
      <div className="agendamentos-list">
        <h3>Você não está  logado, <Link to='/login'>entre aqui.</Link></h3>
      </div>
    )
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

  const handlerGetData = () => {
    const data = new Date();
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    setDataAgendada(ano + '-' + mes + '-' + dia);
  }

  return (
    <div className="page-agendamentos-overlay">
      <div className="container page-agendamentos">
        <div className="title-button">
          <h1>Meus Agendamentos</h1>
          {isAuthenticated ? <button className="button" onClick={() => setIsOpen(true)}><FiPlus /> Novo</button> : null}
        </div>
        {isAuthenticated ?
          (<div className="agendamentos-list">
            {agendamentos.length > 0 ? agendamentosList : <h3 className="">Não há agendamentos no momento!</h3>}
          </div>) : (renderMensagem())
        }
      </div>

      <UIModal isOpen={isOpen} onClickClose={() => setIsOpen(false)}>
        <div className="modal-group">
          <div className="modal-image"><ImCalendar /></div>
          <form onSubmit={handlerSubmit}>
            <div>
              <select title="Selecione um escritório" id="escritorio" placeholder="Chose a option" onChange={event => handlerEstacoes(event.target.value)} required>
                <option value="" hidden>Selecione um escritório</option>
                {escritorios.map((escritorio => {
                  return <option key={escritorio.id} value={escritorio.id}>{escritorio.local}</option>
                }))}
              </select>
            </div>
            <div>
              <select title="Selecione uma estação" id="estacao" onChange={event => setEstacao(event.target.value)} required>
                <option value="" hidden>Selecione uma estação</option>
                {estacoes.map((estacao => {
                  return <option key={estacao.id} value={estacao.id}>{estacao.id}</option>
                }))}
              </select>
            </div>
            <div>
              <input
                title="Selecione uma data"
                min={dataAgendada}
                value={dataAgendada}
                type="date"
                onChange={event => setDataAgendada(event.target.value)}
                required
              />
            </div>
            <div className="form-group-button">
              <button className="button" title="Agendar">Agendar</button>
            </div>
          </form>
        </div>
      </UIModal>

      <SucessoModal sucessoIsOpen={sucessoIsOpen} onClickClose={() => {
        setSucessoIsOpen(false);
        window.location.reload();
      }} >
        <h1>Sucesso</h1>
      </SucessoModal>

      <ErrorModal
        errorIsOpen={errorIsOpen}
        errorMessage={errorMessage}
        onClickClose={() => { setErrorIsOpen(false) }}
      />

    </div>
  );
}

export default Agendamento;