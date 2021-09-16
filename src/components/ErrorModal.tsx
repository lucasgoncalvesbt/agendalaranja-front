import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { MdError } from 'react-icons/md'

import '../styles/css/modal.css';

const portalRoot = document.getElementById('portal-root') as HTMLElement;

const ErrorModal = (props: { errorIsOpen: boolean, errorMessage: string, onClickClose: () => void }) => {
  const { errorIsOpen, errorMessage, onClickClose } = props;
  if (!errorIsOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="ui-modal__overlay">
      <div className="ui-modal">
        <button type="button" className="ui-modal__close-button" onClick={onClickClose}>X</button>
        <div className="modal-group">
          <div className="modal-image icon-red"><MdError /></div>
          <div className="modal-text">
            <h4>Algo deu errado!</h4>
            <p>{errorMessage}</p>
          </div>
        </div>
      </div>
    </div>,
    portalRoot,
  );
};

export default ErrorModal;