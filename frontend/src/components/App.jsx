import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import MainPage from "../pages/MainPage";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ProtectedRoute from "../hocs/ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

import * as auth from '../utils/Auth.js';

/** Основной компонент страницы */
function App() {
  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [userData, setUserData] = useState({});

  /** Проверка токена при монтировании */
  useEffect(() => {
    tokenCheck();
  }, []);

  /** Проверка токена */
  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setUserData(res.data);
          setLoggedIn(true);
          history.push("/mesto");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  /** Авторизация */
  const onLogin = (booleen) => {
    tokenCheck();
    if(!booleen) {
      setIsOpen(true);
      setIsSuccess(booleen);
    }
  }

  /** Закрытие попапа */
  const handleClose = () => {
    setIsOpen(false);
  }

  /** Регистрация */
  const onRegister = (booleen) => {
    setIsOpen(true);
    setIsSuccess(booleen);
  };

  /** Выход из аккаунта */
  const onSignOut = () => {
    localStorage.removeItem('jwt');
    history.push('/signin');
  }

  /** Основная разметка */
  return (
    <>
      <div className="page__container">
        <Switch>
          <ProtectedRoute loggedIn={loggedIn} path="/mesto">
            <MainPage userData={userData} onSignOut={onSignOut} />
          </ProtectedRoute>
          <Route path="/signup" >
            <Register onRegister={onRegister} />
          </Route>
          <Route path="/signin">
            <Login onLogin={onLogin} />
          </Route>
          <Route exact path="/">
            {loggedIn ? <Redirect to="/mesto" /> : <Redirect to="/signin" />}
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>          
        </Switch>
      </div>
      <InfoTooltip isOpen={isOpen} isSuccess={isSuccess} onClose={handleClose} />
    </>
  );
}

export default App;
