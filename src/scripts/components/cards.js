// файл cards.js
const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const placesList = document.querySelector(".places__list");

// Темплейт карточки
function cardTemplate(link, name) {
    const template = document.querySelector('#card-template');
    const cardElement = template.content.cloneNode(true);
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    cardElement.querySelector('.card__title').textContent = name;
    return cardElement;
}

// Функция создания карточки
function createCard(name, link) {
    initialCards.unshift({
        name: name,
        link: link
    });
    renderCards()
}



// Вывести карточки на страницу
function renderCards() {
    placesList.innerHTML = '';
    initialCards.forEach(card => {
        placesList.append(cardTemplate(card.link, card.name));
    });
}

export {
    cardTemplate,
    createCard,
    renderCards,
    initialCards,
    placesList
};