class Api {
    constructor({ baseUrl }) {
        this._baseurl = baseUrl;
    };
    setHeaders(token) {
        this._headers = {
          'Content-Type': 'application/json',
          'authorization': token
        }
    };
    _checkRequest(res) {
        if (res.ok) {
            return res.json();
        } else {
            console.log();
            return Promise.reject(`Ошибка: ${res.status}`)
        }
    };
    _processGetQuery(additionalUrl) {
        return fetch(`${this._baseUrl}${additionalUrl}`, {
          headers: this._headers
        })
          .then(res => this._checkRequest(res))
      }
    getInitialCards() {
        return this._processGetQuery('/cards');
    };
    getUserInfo() {
        return this._processGetQuery('/users/me');
    };
    updateUserInfo({ name, about }) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({ name, about }),
        })
        .then(res => this._checkRequest(res));
    };
    addCard(data) {
        return fetch(`${this._baseUrl}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
            name: data.name,
            link: data.link
          })
        })
        .then(res => this._checkRequest(res));
    };
    changeAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        })
        .then(res => this._checkRequest(res));
    };
    toggleLike(isLiked, cardId) {
        let method = 'PUT';
        if (isLiked) {
          method = 'DELETE'
        }
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
          method,
          headers: this._headers
        })
          .then(res => this._checkRequest(res))
    };
    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
          method: 'DELETE',
          headers: this._headers,
        })
        .then(res => this._checkRequest(res))
    };
    getPageData(){
        return Promise.all([this.getInitialCards(), this.getUserInfo()]);
    }''
};
const api = new Api({
    baseUrl: 'https://pearnatali.nomoredomains.rocks'
});

export default api