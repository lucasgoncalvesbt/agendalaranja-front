import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const portalRoot = document.getElementById('portal-root') as HTMLElement;

const UIModal = (props: { children: ReactNode, isOpen: boolean, onClickClose: () => void }) => {
  const { children, isOpen, onClickClose } = props;
  if (!isOpen) {
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

export default UIModal;