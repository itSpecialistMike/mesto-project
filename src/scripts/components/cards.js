// // файл cards.js
import {fetchCards, postCard} from "./fetchs";

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
    postCard(name, link).then(() => renderCards());
}

// Вывести карточки на страницу
function renderCards() {
    placesList.innerHTML = '';
    fetchCards().then(cards => {
        cards.forEach(card => {
        placesList.append(cardTemplate(card.link, card.name));
    });})
        .catch(err => {
            console.error('Ошибка загрузки профиля:', err);
        });
}

export {
    cardTemplate,
    createCard,
    renderCards,
    placesList
};