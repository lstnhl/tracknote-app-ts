import React, { FC, useState, useRef, useEffect } from 'react';
import s from './Modal.module.scss';
import Button from 'components/UI/Button';
import useModal from 'stores/ModalStore';

const Modal = () => {
  const hideModal = useModal.use.hideModal();
  const visible = useModal.use.visible();
  const title = useModal.use.title();
  const content = useModal.use.content();

  const modalRef = useRef<HTMLDivElement>(null);

  const onClickOutside = (e: MouseEvent) => {
    console.log('he');
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        hideModal();
      }
    };

    const handleEscExit = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            hideModal();
        }
    }

    document.addEventListener('mouseup', handleClickOutside);
    document.addEventListener('keydown', handleEscExit)

    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
      document.removeEventListener('keydown', handleEscExit);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`${s.container} ${!visible && s.hidden}`}>
      <div className={s.modal} ref={modalRef}>
        {title && <h1>{title}</h1>}
        {content}
        <div className={s.exitButtonContainer}>
          <Button
            onClick={() => {
              hideModal();
            }}
          >
            X
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
