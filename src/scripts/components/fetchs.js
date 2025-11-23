import {setCurrentUser} from "../state";

const cohort = 'apf-cohort-202'
const authorization = '18e65fe6-f22e-4549-8c48-91a029fe4686'

const fetchCards = () => {
    return fetch(`https://mesto.nomoreparties.co/v1/${cohort}/cards`, {
        headers: {
            authorization: authorization,
        }
    }).then(catchError)
}

const postCard = (name, link) => {
    return fetch(`https://mesto.nomoreparties.co/v1/${cohort}/cards`, {
        method: "POST",
        body: JSON.stringify({name: name, link: link}),
        headers: {
            'Content-Type': "application/json",
            authorization: `18e65fe6-f22e-4549-8c48-91a029fe4686`
        }
    }).then(catchError)
}

const fetchUser = () => {
    return fetch(`https://mesto.nomoreparties.co/v1/${cohort}/users/me`, {
        headers: {
            authorization: authorization,
        }
    })
        .then(catchError)
        .then(user => {
            setCurrentUser(user)
            return user;
        });
}

const patchUser = (name, about) => {
    return fetch(`https://mesto.nomoreparties.co/v1/${cohort}/users/me`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            authorization: authorization,
        },
        body: JSON.stringify({
            name: name,
            about: about
        })
    }).then(catchError)
}

const deleteCard = (cardId) => {
    return fetch(`https://nomoreparties.co/v1/${cohort}/cards/${cardId}`,
        {
            method: "DELETE",
            headers: {
                authorization: authorization,
            }
        })
}

const putLike = (cardId) => {
    return fetch(`https://nomoreparties.co/v1/${cohort}/cards/likes/${cardId}`,
        {
            method: "PUT",
            headers: {
                authorization: authorization,
            }
        }).then(catchError)
}

const deleteLike = (cardId) => {
    return fetch(`https://nomoreparties.co/v1/${cohort}/cards/likes/${cardId}`,
        {
            method: "DELETE",
            headers: {
                authorization: authorization,
            }
        }).then(catchError)
}

function catchError(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export {
    fetchCards,
    fetchUser,
    postCard,
    patchUser,
    deleteCard,
    putLike,
    deleteLike,
}