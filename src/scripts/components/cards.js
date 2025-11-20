import {fetchCards, postCard} from "./fetchs";

const placesList = document.querySelector(".places__list");

// Темплейт карточки
function cardTemplate(link, name, likes) {
    const template = document.querySelector('#card-template');
    const cardElement = template.content.cloneNode(true);
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__likes').textContent = likes.length;
    return cardElement;
}

// Функция создания карточки
function createCard(name, link) {
    console.log('Создание карточки:', { name, link });

    postCard(name, link)
        .then(card => {
            console.log('Карточка создана успешно:', card);
            placesList.prepend(cardTemplate(card.link, card.name));// prepend - новая карточка сверху
            return card;
        })
        .catch(err => {
            console.error('Ошибка создания карточки:', err);
        });
}

// Вывести карточки на страницу
function renderCards() {
    placesList.innerHTML = '';
    console.log('Начало загрузки карточек...');

    fetchCards()
        .then(cards => {
            console.log(`Загружено ${cards.length} карточек`);
            cards.forEach(card => {
                placesList.append(cardTemplate(card.link, card.name, card.likes, card.owner, card._id));
            });
        })
        .catch(err => {
            console.error('Ошибка загрузки карточек:', err);
        });
}

export {
    cardTemplate,
    createCard,
    renderCards,
    placesList
};