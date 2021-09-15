import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import '../styles/css/modal.css';

const portalRoot = document.getElementById('portal-root') as HTMLElement;

const ErrorModal = (props: { children: ReactNode, errorIsOpen: boolean, onClickClose: () => void }) => {
  const { children, errorIsOpen, onClickClose } = props;
  if (!errorIsOpen) {
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

export default ErrorModal;