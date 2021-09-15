import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import '../styles/css/modal.css';

const portalRoot = document.getElementById('portal-root') as HTMLElement;

const SucessoModal = (props: { children: ReactNode, sucessoIsOpen: boolean, onClickClose: () => void }) => {
  const { children, sucessoIsOpen, onClickClose } = props;
  if (!sucessoIsOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="ui-modal__overlay">
      <div className="ui-modal">
        <button type="button" className="ui-modal__close-button" onClick={onClickClose}>X</button>
        {children}
      </div>
    </div>,
    portalRoot,
  );
};

export default SucessoModal;