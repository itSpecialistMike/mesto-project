import { renderCards, placesList } from './components/cards.js';
import { enableValidation } from './components/validate.js';
import '../pages/index.css';
import logo from '../images/logo.svg';
import {
    handleOpenModal,
    handleCloseModal,
    cardAddModal,
    imgModal,
    profileEditModal,
    modalCloseBtns,
} from './components/modals.js';
import {
    onSubmitEditProfileForm,
    onSubmitAddCardForm,
    profileTitle,
    profileDescription,
} from './components/forms.js';
import {renderProfile} from "./components/profile";


// Добавление лого на страницу
document.querySelector('.header__logo').src = logo;

// Формы и инпуты
const profileEditForm = document.forms['edit-profile'];
const cardAddForm = document.forms['new-place'];
const descriptionInput = profileEditForm.description;
const nameInput = profileEditForm.name;

// DOM узлы
const cardAddBtn = document.querySelector(".profile__add-button");

const profileEditBtn = document.querySelector(".profile__edit-button");


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



// Рендер карточек
renderCards();
renderProfile();
addEventListeners();
const forms = Array.from(document.querySelectorAll('.popup__form'));
forms.forEach(form => enableValidation(form));


