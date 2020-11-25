import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Form from "../components/Form";
import Input from "../components/Input";

import * as auth from '../utils/Auth.js';


/** Страница авторизации пользователя */
function Register(props) {
  const history = useHistory();

  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
  });

  /** Обработка сабмита регистрации */
  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!registerData.email || !registerData.password) {
      return;
    };
    auth
      .register(registerData.email, registerData.password)
      .then((res) => {
        if(res.data) {
          props.onRegister(true);
          history.push("/signin");
        } else {
          return Promise.reject(res);
        }
      })
      .catch((err) => {
        props.onRegister(false);
        console.log(err);
      });
  };

  /** Получение данных из инпутов */
  const handleChange = (e) => {
    const {name, value} = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  /** Основная разметка */
  return (
    <>
      <Header>
        <Link to='/signin' className="link header__link">Войти</Link>
      </Header>
      <div className="content page__content">
        <Form
          title="Регистрация"
          submitValue="Зарегистрироваться"
          onSubmit={handleSubmit}
          formClass="page"
        >
          <Input
            name="email"
            type="email"
            placeholder="E-mail"
            isRequired={true}
            theme="dark"
            value={registerData.email}
            onChange={handleChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="Пароль"
            isRequired={true}
            theme="dark"
            value={registerData.password}
            onChange={handleChange}
          />
        </Form>
        <Link className="link form__link" to="/signin">Уже зарегистрированы? Войти</Link>
      </div>

      <Footer />
    </>
  );
}

export default Register;
