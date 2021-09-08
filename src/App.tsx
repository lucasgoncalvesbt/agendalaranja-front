import React, { useEffect, useState } from 'react';
import api from './services/api';
import './styles/css/App.css';

function App() {
  const [estacoes, setEstacoes] = useState([]);
  const inicio = 'O Inicio'

  useEffect(() => {
    api.get('api/v1/estacao')
      .then((response) => { console.log(response.data) })
      .catch((error) => { console.log(error) });
  }, [])

  /*useEffect(() => {
    async function yu() {      
      const response = await api.get(`api/v1/estacao`)

      console.log(response.data)
    }
    yu()
  }, [])
  */


  return (
    <div>
      <h1 className="color" >{inicio}</h1>
    </div>
  );
}

export default App;
