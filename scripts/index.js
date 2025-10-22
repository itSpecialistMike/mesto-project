import {initialCards} from './cards.js';

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
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(".popup__input_type_description");
const profileEditForm = document.querySelector(".popup_type_edit .popup__form");
const cardAddBtn = document.querySelector(".profile__add-button");
const cardAddModal = document.querySelector(".popup_type_new-card");
const cardAddForm = document.querySelector(".popup_type_new-card .popup__form");
const imgModal = document.querySelector(".popup_type_image");

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
    const formData = new FormData(e.target)
    const { 'place-name':name, link } = serializeForm(e.target)
    createCard(name, link);
    console.log(formData);
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
        // Повешал обработчик события на все кнопки лайка
        if (e.target.classList.contains("card__like-button")) {
            e.target.classList.toggle("card__like-button_is-active");
        }

        // Повешал обработчик события на все кнопки удаления
        if (e.target.classList.contains("card__delete-button")) {
            e.target.closest('.places__item').remove();
        }

        // Модалка с картинкой
        if (e.target.classList.contains("card__image")) {
            imgModal.querySelector('.popup__image').src = e.target.src;
            imgModal.querySelector(".popup__caption").textContent = e.alt;
            handleOpenModal(imgModal);
        }
    });
}

// Рендер карточек
renderCards();
addEventListeners();

