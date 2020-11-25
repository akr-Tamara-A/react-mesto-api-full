import React, { useContext } from "react";
import Card from "./Card";
import Spinner from "./Spinner";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

/** Компонент "Контент страницы" */
export default function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  /** Разметка контента страницы */
  return (
    <main className="content page__content">
      <div className="profile page__section">
        <div className="profile__container">
          <div className="profile__userpic">
            <div
              className="profile__edit"
              onClick={props.onEditAvatar}
              tabIndex="0"
            ></div>
            <img
              src={currentUser && currentUser.avatar}
              alt="Аватар автора"
              className="profile__image"
            />
          </div>
          <div className="profile__user">
            <h2 className="profile__user-name">{currentUser && currentUser.name}</h2>
            <p className="profile__user-job">{currentUser && currentUser.about}</p>
          </div>
          <button
            type="button"
            title="Редактирование профиля"
            onClick={props.onEditProfile}
            className="button button_type_edit-profile button_style_primary"
          />
        </div>
        <div className="profile__add-post">
          <button
            type="button"
            title="Добавить фото"
            onClick={props.onAddPlace}
            className="button button_type_add-photo button_style_primary"
          />
        </div>
      </div>
      <div className="elements page__section">
        <ul className="elements__container">
          {props.isCardsLoading 
            ? <Spinner />
            : (props.cards.length > 0) && props.cards.map((card) => {
              return (
                <Card 
                  card={card} 
                  key={card._id} 
                  onCardClick={props.onCardClick} 
                  onCardLike={props.onCardLike} 
                  onCardDelete={props.onCardDelete}/>
              );
            })
          }
        </ul>
      </div>
    </main>
  );
}
