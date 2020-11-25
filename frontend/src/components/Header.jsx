import React from 'react';
import logoPath from '../images/logo.svg';

/** Компонент "Хедер" */
export default function Header(props) {
  /** Разметка хедера */
  return (
    <header className="header page__header page__section">
      <a href="https://akr-tamara-a.github.io/react-mesto-auth/" className="header__logo-link">
        <img src={logoPath} alt="logo" className="logo header__logo" />
      </a>
      <h1 className="header__title">Сервис Mesto Russia</h1>

      {props.children}
      
    </header>
  );
}

