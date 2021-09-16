import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import '../styles/css/home.css';

import imageHome from '../assets/images/imghome.jpg';


export default function Home() {
  const { isAuthenticated } = useAuth();

  useEffect(() => {

  }, [isAuthenticated])

  return (
    <div className="page-home-overlay">
      <div className="container page-home">
        <div className={"home-intro-tittle"}>
          <h1>Agenda Laranja:<br /> você no escritório, quando quiser!</h1>
          <p>
            O mundo mudou e o seu escritório tabém. <br />
            Você pode decidir <strong>quando</strong> ir até la!
          </p>
          <Link to="/agendamentos" className="button"> Agendar </Link>
        </div>
        <div className={"home-intro-image"}>
          <div>
            <img src={imageHome}></img>
          </div>
        </div>
      </div>
    </div>
  );
}