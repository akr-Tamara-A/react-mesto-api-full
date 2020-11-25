import React, { useCallback, createRef } from "react";

import Popup from "./Popup";
import Form from "./Form";
import Input from "./Input";

export default function EditAvatarPopup({ onUpdateAvatar, submitValue, ...props }) {
  const inputRef = createRef();

  const handleSubmit = useCallback(
    (evt) => {
      evt.preventDefault();
      onUpdateAvatar(inputRef.current.value);
    },
    [inputRef, onUpdateAvatar]
  );

  return (
    <Popup 
      name="editAvatar" 
      popupStyle="popup_style_form"
      {...props}
      >
      <Form
        title="Обновить аватар" 
        submitValue={submitValue}
        formClass="popup"
        onSubmit={handleSubmit}
      >
        <Input
          name="avatar"
          theme="light"
          type="url"
          placeholder="Ссылка на новый аватар"
          isRequired={true}
          ref={inputRef}
        />
      </Form>
    </Popup>
  );
}
