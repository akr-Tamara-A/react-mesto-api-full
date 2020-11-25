import React from "react";
import './styles/form.css';

/** Компонент "Форма" */
export default function Form(props) {

  /** Разметка формы */
  return (
    <form
      action="#"
      name={props.name}
      noValidate
      onSubmit={props.onSubmit}
      className={`form form_style_${props.formClass}`}
    >
      <h2 className="form__title">{props.title}</h2>

      <fieldset className="form__fieldset">
        {props.children}
      </fieldset>
      
      <button
        name={`${props.name}Submit`}
        type="submit"
        className={`form__submit form__submit_style_${props.formClass}`}
      >
        {props.submitValue}
      </button>
    </form>
  );
}

