import { initialCards } from './cards.js';
// @todo: Темплейт карточки
function cardTemplate(link, name) {
    return `
        <li class="places__item card">
           <img class="card__image" src="${link}" alt="${name}" />
           <button type="button" class="card__delete-button"></button>
           <div class="card__description">
             <h2 class="card__title">
               ${name}
             </h2>
             <button type="button" class="card__like-button"></button>
           </div>
        </li>
    `
}

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");
const editProfileBtn = document.querySelector(".profile__edit-button");
const editProfileModal = document.querySelector(".popup_type_edit");
const popUpClose = document.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// @todo: Функция создания карточки
// function createCard(name, link) {
//     initialCards.push({
//         name: name,
//         link: link,
//     });
//     renderCards()
// }

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
function renderCards() {
    placesList.innerHTML = initialCards.map(card => cardTemplate(card.link, card.name));
}

// @todo: Открытие модального окна
function openModal() {
    editProfileModal.classList.add("popup_is-opened");
}

// @todo: Закрытие модального окна
function closeModal() {
    document.querySelector(".popup_is-opened").classList.remove("popup_is-opened");
}

// @todo: Обработчики события
editProfileBtn.addEventListener("click", () => {
    openModal();
})

popUpClose.addEventListener("click", () => {
    closeModal();
})

renderCards();



