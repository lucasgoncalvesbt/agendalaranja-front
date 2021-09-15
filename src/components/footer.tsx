import React from 'react';
import { Link } from 'react-router-dom';

import fclogo from '../assets/images/logobranca.svg';
import agendaLaranjaLogo from '../assets/images/logoagendalaranja.svg';

import '../styles/css/footer.css';

const Footer = () => {

  return (
    <footer>
      <div className="container footer-nav">
        <div className="footer-sobre">
          <h5><img src={agendaLaranjaLogo} /></h5>
          <p>agenda laranja é um meio prático e eficiente para programar o dia do trabalho presencial, respeitando as normas de segurança</p>
          <span>@2021. agenda laranja. squad 29</span>
        </div>
        <nav>
          <Link to="/">FAQ</Link>
          <Link to="/">Tutorais</Link>
          <Link to="/">Sobre nós</Link>
          <Link to="/">Política de privacidade</Link>
          <Link to="/">Termos de Serviço</Link>
        </nav>
        <Link to="https://www.fcamara.com.br/">
          <img src={fclogo} alt="Logo da FCamara" />
        </Link>
      </div>
    </footer>
  )

}

export default Footer;