import React from 'react';
import { useEffect, useState } from "react";
import api from "../services/api";

type Escritorio = {
  id: number,
  local: string,
  capacidade: number
}

export default function Home() {

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
      const response = await api.get(`/escritorio`)
      setEscritorios(response.data)
    }
    handlerLoadData()
  }, [])




  return (
    <div>
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