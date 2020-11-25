import React from "react";

import Popup from "./Popup";
import Form from "./Form";

export default function PopupWithForm({ onDeleteCard, submitValue, ...props }) {

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onDeleteCard();
  };

  return (
    <Popup 
      name="deleteCard" 
      popupStyle="popup_style_form"
      {...props}
      >
      <Form
        title="Вы уверены?" 
        submitValue={submitValue}
        formClass="popup"
        onSubmit={handleSubmit}
      />
    </Popup>
  );
}
