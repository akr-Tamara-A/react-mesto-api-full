import React, { useEffect, useState } from "react";

import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import ImagePopup from "../components/ImagePopup";
import PopupWithForm from "../components/PopupWithForm";
import EditProfilePopup from "../components/EditProfilePopup";
import EditAvatarPopup from "../components/EditAvatarPopup";
import AddPlacePopup from "../components/AddPlacePopup";

import { api } from "../utils/Api";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

/** Основной компонент страницы */
function MainPage(props) {
  const [currentUser, setCurrentUser] = useState({});
  const [isPopupsOpen, setIsPopupsOpen] = useState({
    editAvatar: false,
    editProfile: false,
    addPlace: false,
    viewPlace: false,
    deletePlace: false,
  });
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isCardsLoading, setCardsIsLoading] = useState(true);
  const [submitButtonValues, setSubmitButtonValues] = useState({
    editAvatar: 'Сохранить',
    editProfile: 'Сохранить',
    addPlace: 'Сохранить',
    deletePlace: 'Да',
  });

  /** Обработка выхода из аккаунта */
  const signOut = () => {
    props.onSignOut();
  }

  useEffect(() => {
    /** Загрузка данных текущего пользователя с сервера */
    api
    .getUserInfo()
    .then((data) => {
      setCurrentUser(data);
      console.log(`user info loaded`);
      setCardsIsLoading(true);
      /** Загрузка данных карточек с сервера */
      api
      .getInitialCards()
      .then((data) => {
        setCards(data.reverse());
        console.log(`cards info loaded`);
      })
    })
    .catch((err) => {
      console.log("Ошибка. Не удалось установить новые данные: ", err);
    })
    .finally(() => {
      setCardsIsLoading(false);
        });
    }, [setCurrentUser, setCards]);

  /** Функция закрытия попапов */
  const closeAllPopups = () => {
    setIsPopupsOpen({
      editAvatar: false,
      editProfile: false,
      addPlace: false,
      viewPlace: false,
      deletePlace: false,
    })
    setSelectedCard(null);
  }
  
  /** Обработка лайка карточки */
  const handleCardLike = currentCard => {
    /** Проверка лайкнута ли карточка */
    const isLiked = currentCard.likes.some(user => user === currentUser._id);
    
    api.changeLikeCardStatus(currentCard._id, !isLiked).then((newCard) => {
      const newCards = cards.map((card) => card._id === currentCard._id ? newCard : card);
      setCards(newCards);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  /** */
  const handleDeleteClick = currentCard => {
    setIsPopupsOpen({
      ...isPopupsOpen,
      deletePlace: true,
    });
    setSelectedCard(currentCard);
  }

  /** Обработка удаления карточки */
  const handleCardDelete = () => {
    setSubmitButtonValues({
      ...submitButtonValues, 
      deletePlace: 'Удаление...',
    })
    const currentCard = selectedCard;
    api.deleteCard(currentCard._id)
    .then((res) => {
      const newCards = cards.filter(card => {
        return card._id !== currentCard._id
      });
      setCards(newCards);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setSubmitButtonValues({
        ...submitButtonValues, 
        deletePlace: 'Да',
      })
    })
  }

  /** Функция обработки клика по карточке */
  const handleCardClick = card => {
    setSelectedCard(card);
    setIsPopupsOpen({
      ...isPopupsOpen,
      viewPlace: true,
    })
  }

  /** Обработка сабмита редактирования профиля пользователя */
  const handleUpdateUser = (data) => {
    setSubmitButtonValues({
      ...submitButtonValues, 
      editProfile: 'Загружается...',
    })
    api.patchUserInfo(data)
    .then(data => {
      setCurrentUser(data);
    })
    .catch((err) => {
      console.log("Ошибка. Не удалось установить новые данные: ", err);
    })
    .finally(() => {
      setSubmitButtonValues({
        ...submitButtonValues, 
        editProfile: 'Сохранить',
      })
      closeAllPopups();
    });
  }

  /** Обработка сабмита редактирования аватара пользователя */
  const handleUpdateAvatar = (data) => {
    setSubmitButtonValues({
      ...submitButtonValues, 
      editAvatar: 'Загружается...',
    });
    api.patchUserAvatar(data)
    .then(data => {
      setCurrentUser(data);
    })
    .catch((err) => {
      console.log("Ошибка. Не удалось установить новые данные: ", err);
    })
    .finally(() => {
      setSubmitButtonValues({
        ...submitButtonValues, 
        editAvatar: 'Сохранить',
      })
      closeAllPopups();
    });
  }
  
  /** Обработка сабмита добавления карточки */
  const handleAddCard = (title, link) => {
    setSubmitButtonValues({
      ...submitButtonValues,
      addPlace: "Загружается...",
    });
    api
      .postNewCard(title, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        console.log("Ошибка. Не удалось установить новые данные: ", err);
      })
      .finally(() => {
        setSubmitButtonValues({
          ...submitButtonValues,
          addPlace: "Сохранить",
        });
        closeAllPopups();
      });
  };

  /** Основная разметка */
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header>
        <div>
          <span className="mail">{props.userData && props.userData.email}</span>
          <button className="link header__link" onClick={signOut}>Выйти</button>
        </div>
      </Header>
      <Main
        cards={cards}
        isCardsLoading={isCardsLoading}
        onEditProfile={() => {
          setIsPopupsOpen({
            ...isPopupsOpen,
            editProfile: true,
          })
        }}
        onEditAvatar={() => {
          setIsPopupsOpen({
            ...isPopupsOpen,
            editAvatar: true,
          })
        }}
        onAddPlace={() => {
          setIsPopupsOpen({
            ...isPopupsOpen,
            addPlace: true,
          })
        }}
        onCardClick={(card) => {
          handleCardClick(card);
        }}
        onCardLike={(card) => {
          handleCardLike(card);
        }}
        onCardDelete={(card) => {
          handleDeleteClick(card);
        }}
      />
      <Footer />
      <EditProfilePopup
        submitValue={submitButtonValues.editProfile}
        isOpen={isPopupsOpen.editProfile}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <EditAvatarPopup
        submitValue={submitButtonValues.editAvatar}
        isOpen={isPopupsOpen.editAvatar}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <AddPlacePopup
        submitValue={submitButtonValues.addPlace}
        isOpen={isPopupsOpen.addPlace}
        onClose={closeAllPopups}
        onAddPlace={handleAddCard}
      />
      <ImagePopup 
        card={selectedCard} 
        isOpen={isPopupsOpen.viewPlace}
        onClose={closeAllPopups}
      />
      <PopupWithForm
        submitValue={submitButtonValues.deletePlace}
        isOpen={isPopupsOpen.deletePlace}
        onClose={closeAllPopups}
        onDeleteCard={handleCardDelete}
      />
    </CurrentUserContext.Provider>
  );
}

export default MainPage;
