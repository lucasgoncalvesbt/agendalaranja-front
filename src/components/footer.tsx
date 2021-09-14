import React from 'react';
import { Link } from 'react-router-dom';

import fclogo from '../assets/images/logobranca.svg';

import '../styles/css/footer.css';

const Footer = () => {

  return (
    <footer>
      <div className="container footer-nav">
        <nav>
          @
        </nav>
        <Link to="/">
          <img src={fclogo} alt="Logo da FCamara" />
        </Link>
      </div>
    </footer>
  )

}

export default Footer;