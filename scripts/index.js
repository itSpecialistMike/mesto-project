import {initialCards} from './cards.js';

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
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector(".popup_type_edit");
const modalCloseBtns = document.querySelectorAll(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(".popup__input_type_description");
const profileEditForm = document.querySelector(".popup_type_edit .popup__form");
const cardAddBtn = document.querySelector(".profile__add-button");
const cardAddModal = document.querySelector(".popup_type_new-card");
const cardAddForm = document.querySelector(".popup_type_new-card .popup__form");

// @todo: Функция создания карточки
function createCard(name, link) {

    initialCards.push({
        name: name,
        link: link
    });
    renderCards()
}

// @todo: Функция удаления карточки

// Вывести карточки на страницу
function renderCards() {
    placesList.innerHTML = initialCards.map(card => cardTemplate(card.link, card.name));
}

// Открытие модального окна
function handleOpenModal(modal) {
    modal.classList.add("popup_is-opened");
}

// Закрытие модального окна
function handleCloseModal() {
    document.querySelectorAll(".popup_is-opened").forEach(modal => modal.classList.remove("popup_is-opened"));
}

// сериализация форм
function serializeForm(formNode) {
    const formData = new FormData(formNode);
    return Object.fromEntries(formData);
}

// сабмит формы редактирования профиля
function onSubmitEditProfileForm(e) {
    e.preventDefault()
    const { name, description } = serializeForm(e.target)
    profileTitle.textContent = name;
    profileDescription.textContent = description;
    handleCloseModal()
}

function onSubmitAddCardForm(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const { 'place-name':name, link } = serializeForm(e.target)
    createCard(name, link);
    console.log(formData);
    handleCloseModal()
}

// @todo: Обработчики событий
profileEditBtn.addEventListener("click", () => {
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
    handleOpenModal(profileEditModal);
})

cardAddForm.addEventListener("submit", onSubmitAddCardForm);

modalCloseBtns.forEach(closeModal => {
    closeModal.addEventListener("click", () => {
        handleCloseModal();
    });
});

profileEditForm.addEventListener("submit", onSubmitEditProfileForm);

cardAddBtn.addEventListener("click", () => {handleOpenModal(cardAddModal)})

// Рендер карточек
renderCards();