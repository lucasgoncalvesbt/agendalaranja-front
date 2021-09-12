import React from 'react';
import { useEffect, useState } from "react";
import { useAuth } from '../hooks/useAuth';
import api from "../services/api";

type Escritorio = {
  id: number,
  local: string,
  capacidade: number
}

export default function Home() {
  const { user } = useAuth();

  const [escritorios, setEscritorios] = useState<Escritorio[]>([]);

  /*
  useEffect(() => {
    api.get('api/v1/estacao')
      .then((response) => { setEstacoes(response.data) })
      .catch((error) => { console.log(error) });
  }, [])
  */

  useEffect(() => {
    async function handlerLoadData() {
      const token = localStorage.getItem('token');

      const response = await api.get(`/escritorio`, { headers: { Authorization: 'Bearer ' + token } })
      setEscritorios(response.data)
    }
    handlerLoadData()
  }, [])


  function handlerUsu() {
    console.log(user)
  }

  return (
    <div>
      <button onClick={handlerUsu}>usuario ???</button>
      <h1>Home</h1>
      {escritorios.map(({ id, local, capacidade }) => (
        <ul key={id}>
          <li>id {id}</li>
          <li>local {local}</li>
          <li>capacidade {capacidade}</li>
        </ul>
      ))}
    </div>
  );
}