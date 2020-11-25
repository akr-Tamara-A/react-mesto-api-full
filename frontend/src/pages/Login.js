import React, { useState } from "react";
import { Link } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Form from "../components/Form";
import Input from "../components/Input";

import * as auth from '../utils/Auth.js';


/** Страница авторизации пользователя */
function Login(props) {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  /** Обработка сабмита авторизации */
  const handleSubmit = (evt) => {
    evt.preventDefault();
    
    if (!loginData.email || !loginData.password) {
      return;
    }
    auth
      .authorize(loginData.email, loginData.password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          props.onLogin(true);
        } else {
          return Promise.reject(res);
        }
      })
      .catch((err) => {
        props.onLogin(false);
        console.log(err);
      });
  };

  /** Получение данных из инпутов */
  const handleChange = (e) => {
    const {name, value} = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  /** Основная разметка */
  return (
    <>
      <Header>
        <Link to='/signup' className="link header__link">Регистрация</Link>
      </Header>
      <div className="content page__content">
        <Form
          title="Вход"
          submitValue="Войти"
          onSubmit={handleSubmit}
          formClass="page"
        >
          <Input
            name="email"
            type="email"
            placeholder="E-mail"
            isRequired={true}
            theme="dark"
            onChange={handleChange}
          />
          <Input
            name="password"
            type="password"
            placeholder="Пароль"
            isRequired={true}
            theme="dark"
            onChange={handleChange}
          />
        </Form>
      </div>

      <Footer />
    </>
  );
}

export default Login;
