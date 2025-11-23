import {setCurrentUser} from "../state";

const fetchCards = () => {
    return fetch("https://mesto.nomoreparties.co/v1/apf-cohort-202/cards", {
        headers: {
            authorization: `18e65fe6-f22e-4549-8c48-91a029fe4686`,
        }
    }).then(catchError)
}

const postCard = (name, link) => {
    return fetch("https://mesto.nomoreparties.co/v1/apf-cohort-202/cards", {
        method: "POST",
        body: JSON.stringify({name: name, link: link}),
        headers: {
            'Content-Type': "application/json",
            authorization: `18e65fe6-f22e-4549-8c48-91a029fe4686`
        }
    }).then(catchError)
}

const fetchUser = () => {
    return fetch("https://mesto.nomoreparties.co/v1/apf-cohort-202/users/me", {
        headers: {
            authorization: `18e65fe6-f22e-4549-8c48-91a029fe4686`,
        }
    })
        .then(catchError)
        .then(user => {
            setCurrentUser(user)
            return user;
        });
}

const patchUser = (name, about) => {
    return fetch('https://mesto.nomoreparties.co/v1/apf-cohort-202/users/me', {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            authorization: `18e65fe6-f22e-4549-8c48-91a029fe4686`,
        },
        body: JSON.stringify({
            name: name,
            about: about
        })
    }).then(catchError)
}

const deleteCard = (cardId) => {
    return fetch(`https://nomoreparties.co/v1/apf-cohort-202/cards/${cardId}`,
        {
            method: "DELETE",
            headers: {
                authorization: `18e65fe6-f22e-4549-8c48-91a029fe4686`,
            }
        })
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
}