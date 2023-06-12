export const baseUrl = 'https://api.pearnatali.nomoredomains.rocks';

export const checkRequest = (res) => {
    if (res.ok) {
        return res.json();
    } else {
        console.log();
        return Promise.reject(`${res.status} ${res.statusText}`)
    }
};
export const register = (email, password) => {
    const newUrl = baseUrl + '/signup';
    return fetch(newUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
    .then((res) => {return checkRequest(res)})
};
export const authorize = (email, password) => {
    const newUrl = baseUrl + '/signin';
        return fetch(newUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then((res) => {return checkRequest(res)})
        .then((data) => {
            if (data.token){
                localStorage.setItem('token', data.token);
                return data;
            }
        })
};