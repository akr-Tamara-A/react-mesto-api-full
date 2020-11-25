import React from 'react';

import './styles/infoBlock.css';
import iconYesPath from '../images/yes.svg';
import iconNoPath from '../images/no.svg';
import Popup from './Popup';

/** Компонент "Попап редактирование профиля" */
export default function InfoTooltip(props) {

  return (
    <Popup name="infoTooltip" popupStyle="popup_style_form" {...props}>
      <div className="infoBlock">
        {props.isSuccess 
          ? <img className="infoBlock__icon" src={iconYesPath} alt="Успешно" /> 
          : <img className="infoBlock__icon" src={iconNoPath} alt="Неудача" /> 
        }
        <p className="infoBlock__text">
        {`${props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}`} 
        </p>
      </div>
    </Popup>
  );
}
