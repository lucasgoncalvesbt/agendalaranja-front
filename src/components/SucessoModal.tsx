import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { FaCheckCircle } from 'react-icons/fa'

import '../styles/css/modal.css';

const portalRoot = document.getElementById('portal-root') as HTMLElement;

const SucessoModal = (props: { sucessoIsOpen: boolean, onClickClose: () => void }) => {
  const { sucessoIsOpen, onClickClose } = props;
  if (!sucessoIsOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="ui-modal__overlay">
      <div className="ui-modal">
        <button type="button" className="ui-modal__close-button" onClick={onClickClose}>X</button>
        <div className="modal-group">
          <div className="modal-image icon-green"><FaCheckCircle /></div>
          <div className="modal-text">
            <h4>Tudo pronto!</h4>
            <p>Seu agendamento foi realizado com sucesso!</p>
          </div>
        </div>
      </div>
    </div>,
    portalRoot,
  );
};

export default SucessoModal;