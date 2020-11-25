import React from 'react'; 
import './styles/spinner.css'; 
 
/** Компонент "Спиннер" */ 
export default function Spinner() { 
  /** Разметка спиннера */ 
  return ( 
    <div className="spinner"> 
      <div className="spinner__item"></div> 
    </div> 
  ); 
} 