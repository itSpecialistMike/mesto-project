import {setCurrentUser} from "../state";

const catchError = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

const config = {
    baseUrl: 'https://nomoreparties.co/v1/apf-cohort-202',
    headers: {
        authorization: '18e65fe6-f22e-4549-8c48-91a029fe4686',
        'Content-Type': 'application/json'
    }
}

const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    }).then(catchError)
}

const postCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({name: name, link: link}),
    }).then(catchError)
}

const getUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(catchError)
        .then(user => {
            setCurrentUser(user)
            return user;
        });
}

const patchUser = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about
        })
    }).then(catchError)
}

const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`,
        {method: "DELETE",
            headers: config.headers}
    ).then(catchError)}

const putLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`,
        {
            method: "PUT",
            headers: config.headers
        }).then(catchError)
}

const deleteLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`,
        {
            method: "DELETE",
            headers: config.headers
        }).then(catchError)
}

const patchAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`,
        {
            method: "PATCH",
            headers: config.headers,
            body: JSON.stringify({
                avatar: avatar
            })
        }).then(catchError)
}

export {
    getInitialCards,
    postCard,
    getUser,
    patchUser,
    deleteCard,
    putLike,
    deleteLike,
    patchAvatar
}