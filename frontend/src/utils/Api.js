class Api {
    constructor({url, headers}) {
        this._url = url;
    };
    setHeaders(token) {
        this._headers = {
          'Content-Type': 'application/json',
          'authorization': token,
        }
    };
    _checkRequest(res) {
        if (res.ok) {
            return res.json();
        } else {
            console.log();
            return Promise.reject(`${res.status} ${res.statusText}`)
        }
    };
    getInitialCards() {
        const newUrl = this._url + '/cards';
        return fetch(newUrl, {
            headers: this._headers,
        })
        .then(this._checkRequest);
    };
    getUserInfo() {
        const newUrl = this._url + '/users/me';
        return fetch(newUrl, {
            headers: this._headers,
        })
        .then(this._checkRequest);
    };
    updateUserInfo({ name, about }) {
        const newUrl = this._url + '/users/me';
        return fetch(newUrl, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({ name, about }),
        })
        .then(this._checkRequest);
    };
    addCard(data) {
        const newUrl = this._url + '/cards'
        return fetch(newUrl, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
            name: data.name,
            link: data.link
          })
        })
        .then(this._checkRequest);
    };
    changeAvatar(link) {
        const newUrl = this._url + `/users/me/avatar`;
        return fetch(newUrl, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        })
        .then(this._checkRequest);
    };
    toggleLike(isLiked, cardId) {
        let method = 'PUT';
        if (isLiked) {
          method = 'DELETE'
        }
        return fetch(this._url + `/cards/${cardId}/likes`, {
          method,
          headers: this._headers
        })
          .then(res => this._checkRequest(res))
    };
    deleteCard(cardId) {
        const newUrl = this._url + `/cards/${cardId}`;
        return fetch(newUrl, {
          method: 'DELETE',
          headers: this._headers,
        })
        .then(this._checkRequest);
    }
}
const api = new Api({
    url: 'https://api.pearnatali.nomoredomains.rocks',
});

export default api