import React from "react";
import { useEffect } from "react";
import './styles/popup.css';

/** Компонент "Попап" */
export default function Popup(props) {

  useEffect(() => {
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [props.isOpen]);

  const handleEsc = (e) => {
    if (e.key !== 'Escape') return;
    props.onClose();
  }

  /** Разметка попапа */
  return (
    <div
      id={props.name}
      className={`popup ${props.popupStyle} ${props.isOpen && "popup_opened"}`}
      tabIndex={`${props.isOpen ? '0' : '-1'}`}
      onClick={(e) => {
        if (e.currentTarget === e.target) props.onClose();
      }}
    >
      <div className="popup__container">
        <button
          name="editProfileClose"
          type="button"
          title="Закрыть окно"
          onClick={props.onClose}
          className="popup__close"
        />

        {props.children}
        
      </div>
    </div>
  );
}

