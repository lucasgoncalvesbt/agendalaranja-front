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
          <Link to="/" title="Volta para home">
            <img src={agendaLaranjaLogo} alt="Logo da Agenda Laranja" />
          </Link>
          <p>agenda laranja é um meio prático e eficiente para programar o dia do trabalho presencial, respeitando as normas de segurança</p>
          <span>@2021. agenda laranja. squad 29</span>
        </div>
        <nav>
          <Link to="/" title="FAQ">FAQ</Link>
          <Link to="/" title="Tutorais">Tutorais</Link>
          <Link to="/" title="Sobre nós">Sobre nós</Link>
          <Link to="/" title="Política de privacidade">Política de privacidade</Link>
          <Link to="/" title="Termos de Serviço">Termos de Serviço</Link>
        </nav>
        <a href="https://www.fcamara.com.br/" target="_blank" title="Pagina do Grupo FCamara">
          <img src={fclogo} alt="Logo da FCamara" />
        </a>
      </div>
    </footer>
  )

}

export default Footer;