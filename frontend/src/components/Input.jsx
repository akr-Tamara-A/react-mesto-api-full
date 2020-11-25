import React, { forwardRef } from "react";

/** Компонент "Инпут" */
const Input = forwardRef(({ name, isRequired, theme, ...rest }, ref) => {
  /** Разметка инпута */
  return (
    <label className="popup__form-field">
      <input
        ref={ref}
        id={`input-${name}`}
        name={name}
        required={isRequired}
        autoComplete="true"
        {...rest}
        className={`popup__input popup__input_style_${theme}`}
      />
      <span id={`input-${name}-error`} className="popup__input-error"></span>
    </label>
  );
});
export default Input;
