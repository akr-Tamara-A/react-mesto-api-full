import { BASE_URL } from "./Auth";

export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this.headers = options.headers;
  }

  /** получить список всех карточек в виде массива (GET) */
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, { headers: this.getHeaders() })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`${res.status} ${res.statusText}`);
      })
  }

  /** получить данные пользователя (GET) */
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this.getHeaders() })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`${res.status} ${res.statusText}`);
      })
  }

  /** заменить данные пользователя (PATCH) */
  patchUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`${res.status} ${res.statusText}`);
    });
  }

  /** заменить аватар (PATCH) */
  patchUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`${res.status} ${res.statusText}`);
    });
  }

  /** добавить карточку (POST) */
  postNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`${res.status} ${res.statusText}`);
    });
  }

  /** */
  changeLikeCardStatus(cardId, isLiked) {
    const method = isLiked ? "PUT" : "DELETE";
    
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: method,
      headers: this.getHeaders(),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`${res.status} ${res.statusText}`);
    });
  }

  /** "залайкать" карточку (PUT) */
  likeCard(cardID) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: "PUT",
      headers: this.getHeaders(),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`${res.status} ${res.statusText}`);
    });
  }

  /** удалить лайк карточки (DELETE) */
  unlikeCard(cardID) {
    return fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`${res.status} ${res.statusText}`);
    });
  }

  /** удалить карточку (DELETE) */
  deleteCard(cardID) {
    return fetch(`${this._baseUrl}/cards/${cardID}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`${res.status} ${res.statusText}`);
    });
  }

  getHeaders () {
    const token = getToken();

    return {
      ...this.headers,
      'Authorization': `Bearer ${token}`,
    }
  }
}

/** Связь с сервером */
export const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});


const getToken = () => {
  return localStorage.getItem('jwt');
}