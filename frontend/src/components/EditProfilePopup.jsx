import React, { useState, useContext, useCallback, useEffect } from 'react';

import { CurrentUserContext } from "../contexts/CurrentUserContext";

import Popup from './Popup';
import Form from './Form';
import Input from "./Input";


/** Компонент "Попап редактирование профиля" */
export default function EditProfilePopup({onUpdateUser, submitValue, ...props}) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setDescription(currentUser.about || '');
    }
  }, [currentUser]);

  const handleOnChangeName = useCallback(evt => {
    setName(evt.target.value);
  }, [setName]);

  const handleOnChangeDescription = useCallback(evt => {
    setDescription(evt.target.value);
  }, [setDescription]);

  const handleSubmit = useCallback((evt) => {
    evt.preventDefault();

    onUpdateUser({
      name, 
      about: description});
  }, [name, description, onUpdateUser]);

  return (
    <Popup 
      name="editProfile" 
      popupStyle="popup_style_form"
      {...props}
    >
      <Form
        title="Редактировать профиль"
        submitValue={submitValue}
        formClass="popup"
        onSubmit={handleSubmit}
      >
        <Input
          name="userName"
          theme="light"
          type="text"
          minLength="2"
          maxLength="40"
          pattern="^[A-Za-zА-Яа-яЁё\s-]+$"
          placeholder="Имя пользователя"
          isRequired={true}
          value={name}
          onChange={handleOnChangeName}
        />
        <Input
          name="userJob"
          theme="light"
          type="text"
          minLength="2"
          maxLength="200"
          placeholder="О себе"
          isRequired={true}
          value={description}
          onChange={handleOnChangeDescription}
        />
      </Form>
    </Popup>
  );
}