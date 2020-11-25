import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

/** Компонент "Карточка" */
export default function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  /** Функция обработки клика по карточке */
  function handleClick() {
    props.onCardClick(props.card);
  }

  /** Функция обработки лайка карточки */
  function handleLike() {
    props.onCardLike(props.card);
  }

  /** Функция обработки удаления карточки */
  function handleDelete() {
    props.onCardDelete(props.card);
  }

  /** Проверка если создатель карточки - текущий пользователь */
  const isOwn = props.card.owner === currentUser._id;

  /** Переменная со стиля для кнопки удаления карточки */
  const cardDeleteButtonClassName = `
      element__delete 
      button 
      button_style_secondary 
      button_type_delete
      ${!isOwn ? "element__delete_hidden" : null}`;

  /** Проверка есть ли у карточки лайк, поставленный текущим пользователем */
  const isLiked = props.card.likes.some((i) => i === currentUser._id);

  /** Переменная со стиля для кнопки лайка карточки */
  const cardLikeButtonClassName = `
    button 
    element__like-button 
    button_style_secondary
    ${isLiked ? "button_type_like" : "button_type_no-like"}
    `;

  /** Разметка карточки */
  return (
    <li className="elements__item element">
      <figure className="element__wrapper">
        <div className="element__head">
          <img
            src={props.card.link}
            alt={props.card.name}
            tabIndex="0"
            onClick={handleClick}
            className="element__image"
          />
        </div>
        <figcaption className="element__figcaption">
          <h3 className="element__title">{props.card.name}</h3>
          <div className="element__like">
            <button
              type="button"
              title="Добавь лайк"
              className={cardLikeButtonClassName}
              onClick={handleLike}
            />
            <p className="element__like-counter">{props.card.likes.length}</p>
          </div>
        </figcaption>
      </figure>
      <button
        type="button"
        title="Удалить фото"
        className={cardDeleteButtonClassName}
        onClick={handleDelete}
      />
    </li>
  );
}
