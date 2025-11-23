import {fetchCards, postCard} from "./fetchs";

const placesList = document.querySelector(".places__list");

// Темплейт карточки
function cardTemplate(link, name, likes = [], owner = null, cardId = null, currentUser = null) {
    const template = document.querySelector('#card-template');
    const cardElement = template.content.cloneNode(true);

    const isLikedByCurrentUser = currentUser && likes.some(like => like._id === currentUser._id);
    if (isLikedByCurrentUser) {
        cardElement.querySelector('.card__like-button').classList.add('card__like-button_is-active');
    }

    // Заполняем базовые данные
    cardElement.querySelector('.card').dataset.cardId = cardId;
    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    cardElement.querySelector('.card__title').textContent = name;
    cardElement.querySelector('.card__likes').textContent = likes.length;


    const deleteBtn = cardElement.querySelector('.card__delete-button');

    // Проверяем владельца карточки по ID
    if (!currentUser) {
        //currentUser не загружен, скрываем все кнопки удаления
        deleteBtn.style.display = 'none';
    } else if (owner && owner._id !== currentUser._id) {
        // Скрываем кнопку удаления чужая карточка
        deleteBtn.style.display = 'none';
    }

    return cardElement;
}



// Функция создания карточки
function createCard(name, link) {
    // Создание карточки: { name, link }
    postCard(name, link)
        .then(card => {
            // Карточка создана успешно:
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

    fetchCards()
        .then(cards => {
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

// Проверяет, лайкнул ли текущий пользователь карточку
function checkLike(cardElement) {
    const likeButton = cardElement.querySelector('.card__like-button');
    return likeButton.classList.contains("card__like-button_is-active");
}

// Добавляет лайк в UI (оптимистичное обновление)
function likeAddUI(cardElement) {
    const likeButton = cardElement.querySelector('.card__like-button');
    const likesCounter = cardElement.querySelector('.card__likes');

    likeButton.classList.add("card__like-button_is-active");
    likesCounter.textContent = parseInt(likesCounter.textContent) + 1;
}

// Убирает лайк из UI (оптимистичное обновление)
function likeRemoveUI(cardElement) {
    const likeButton = cardElement.querySelector('.card__like-button');
    const likesCounter = cardElement.querySelector('.card__likes');

    likeButton.classList.remove("card__like-button_is-active");
    likesCounter.textContent = parseInt(likesCounter.textContent) - 1;
}


export {
    cardTemplate,
    createCard,
    renderCards,
    placesList,
    likeAddUI,
    likeRemoveUI,
    checkLike
};