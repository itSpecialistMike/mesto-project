import {initialCards} from './cards.js';
import '../pages/index.css';
import logo from '../images/logo.svg';


// Добавление лого на страницу
document.querySelector('.header__logo').src = logo;

// Темплейт карточки
function cardTemplate(link, name) {

    const template = document.querySelector('#card-template');
    const cardElement = template.content.cloneNode(true);

    cardElement.querySelector('.card__image').src = link;
    cardElement.querySelector('.card__image').alt = name;
    cardElement.querySelector('.card__title').textContent = name;

    return cardElement;
}

// DOM узлы
const placesList = document.querySelector(".places__list");
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector(".popup_type_edit");
const modalCloseBtns = document.querySelectorAll(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const cardAddBtn = document.querySelector(".profile__add-button");
const cardAddModal = document.querySelector(".popup_type_new-card");
const imgModal = document.querySelector(".popup_type_image");

// Формы и инпуты
const profileEditForm = document.forms['edit-profile'];
const cardAddForm = document.forms['new-place'];
const descriptionInput = profileEditForm.description;
const nameInput = profileEditForm.name;

// Функция создания карточки
function createCard(name, link) {
    initialCards.unshift({
        name: name,
        link: link
    });
    renderCards()
}

// Функция закрытия по ESC
function handleEsc(e) {
    if (e.key === "Escape") {
        handleCloseModal();
    }
}

// Навесил обработчик клика на оверлей и анимации на модалки
document.querySelectorAll(".popup").forEach(popup => {
    popup.classList.add("popup_is-animated"); // анимация
    popup.addEventListener("click", e => {
        if (e.target === popup) {
            handleCloseModal();
        }
    });
    }
)

// Вывести карточки на страницу
function renderCards() {
    placesList.innerHTML = '';
    initialCards.forEach(card => {
        placesList.append(cardTemplate(card.link, card.name));
    });
}

// Открытие модального окна
function handleOpenModal(modal) {
    modal.classList.add("popup_is-opened");
    document.body.style.overflow = 'hidden';
    document.addEventListener("keydown", handleEsc);
}

// Закрытие модального окна
function handleCloseModal() {
    document.querySelectorAll(".popup_is-opened").forEach(modal => modal.classList.remove("popup_is-opened"));
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleEsc);
}

// Сериализация форм
function serializeForm(formNode) {
    const formData = new FormData(formNode);
    return Object.fromEntries(formData);
}

// Сабмит формы редактирования профиля
function onSubmitEditProfileForm(e) {
    e.preventDefault()
    const { name, description } = serializeForm(e.target)
    profileTitle.textContent = name;
    profileDescription.textContent = description;
    handleCloseModal()
}

// Сабмит добавления карточки
function onSubmitAddCardForm(e) {
    e.preventDefault()
    const { 'place-name':name, link } = serializeForm(e.target)
    createCard(name, link);
    e.target.reset()
    handleCloseModal()
}

// Вынес обработчики событий в отдельную функцию
function addEventListeners() {
    // Повешал обработчик события на все кнопки закрытия модалки
    modalCloseBtns.forEach(closeModal => {
        closeModal.addEventListener("click", () => {
            handleCloseModal();
        });
    });

    // Событие редактирования профиля
    profileEditBtn.addEventListener("click", () => {
        nameInput.value = profileTitle.textContent;
        descriptionInput.value = profileDescription.textContent;
        handleOpenModal(profileEditModal);
    })

    // событие добавления карточки
    cardAddForm.addEventListener("submit", onSubmitAddCardForm);

    // Сабмит изменения профиля
    profileEditForm.addEventListener("submit", onSubmitEditProfileForm);

    // Событие открытия модального окна добавления карточки
    cardAddBtn.addEventListener("click", () => {handleOpenModal(cardAddModal)})

    placesList.addEventListener("click", e => {
        // Повешал обработчик события на все кнопки
        if (e.target.classList.contains("card__like-button")) {
            e.target.classList.toggle("card__like-button_is-active");
        } else if (e.target.classList.contains("card__delete-button")) {
            e.target.closest('.card').remove();
        } else if (e.target.classList.contains("card__image")) {
            imgModal.querySelector('.popup__image').src = e.target.src;
            imgModal.querySelector(".popup__caption").textContent = e.target.alt;
            handleOpenModal(imgModal);
        }
    });
}

function showInputError(input) {
    input.classList.add("popup__input_type_error");
}

function removeInputError(input) {
    input.classList.remove("popup__input_type_error");
}

function formValidate(form) {
    const inputs = Array.from(form.querySelectorAll('.popup__input'));
    const submitBtn = form.querySelector('.popup__button');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            checkInputValidity(form, input);
            toggleButtonState(inputs, submitBtn);
        })
    })
    toggleButtonState(inputs, submitBtn);
}

function checkInputValidity(form, input) {
    const errorElement = form.querySelector(`#${input.id}-error`);

    if (!input.validity.valid) {
        showInputError(input);
        errorElement.textContent = input.validationMessage;
    } else {
        removeInputError(input);
        errorElement.textContent = '';
    }
}

function toggleButtonState(inputs, button) {
    const formIsValid = inputs.every(input => input.validity.valid);
    button.disabled = !formIsValid;
    button.classList.toggle("popup__button_disabled", !formIsValid);
}
// Рендер карточек
renderCards();
addEventListeners();
const forms = Array.from(document.querySelectorAll('.popup__form'));
forms.forEach(form => formValidate(form));


