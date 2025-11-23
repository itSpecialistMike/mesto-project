import {fetchCards, postCard} from "./fetchs";

const placesList = document.querySelector(".places__list");

// Темплейт карточки
function cardTemplate(link, name, likes = [], owner = null, cardId = null, currentUser = null) {
    const template = document.querySelector('#card-template');
    const cardElement = template.content.cloneNode(true);

    // Заполняем базовые данные
    cardElement.querySelector('.card').dataset.cardId = cardId;
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__likes').textContent = likes.length;


    const deleteBtn = cardElement.querySelector('.card__delete-button');

    // Проверяем владельца карточки по ID
    if (!currentUser) {
        console.log('currentUser не загружен, скрываем все кнопки удаления');
        deleteBtn.style.display = 'none';
    } else if (owner && owner._id !== currentUser._id) {
        console.log('Скрываем кнопку удаления чужая карточка');
        deleteBtn.style.display = 'none';
    } else {
        console.log('Показываем кнопку удаления наша карточка');
    }

    return cardElement;
}



// Функция создания карточки
function createCard(name, link) {
    console.log('Создание карточки:', { name, link });
    postCard(name, link)
        .then(card => {
            console.log('Карточка создана успешно:', card);
            placesList.prepend(cardTemplate(
                card.link,
                card.name,
                card.likes,
                card.owner,
                card._id
            ));// prepend - новая карточка сверху
        })
        .catch(err => {
            console.error('Ошибка создания карточки:', err);
        });
}

// Вывести карточки на страницу
function renderCards(currentUser) {
    placesList.innerHTML = '';
    console.log('Начало загрузки карточек...');

    fetchCards()
        .then(cards => {
            console.log(cards);
            cards.forEach(card => {
                placesList.append(cardTemplate(
                    card.link,
                    card.name,
                    card.likes,
                    card.owner,
                    card._id,
                    currentUser
                ));
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