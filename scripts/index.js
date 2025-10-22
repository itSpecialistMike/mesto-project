import {initialCards} from './cards.js';

// Темплейт карточки
function cardTemplate(link, name) {
    const card = document.createElement('li')
    card.className = 'places__item card'

    const img = document.createElement('img')
    img.src = link
    img.alt = name
    img.classList.add('card__image')

    const deleteButton = document.createElement('button')
    deleteButton.type = 'button'
    deleteButton.className = 'card__delete-button'

    const cardDescription = document.createElement('div')
    cardDescription.className = 'card__description'

    const cardTitle = document.createElement('h2')
    cardTitle.textContent = name
    cardTitle.className = 'card__title'

    const likeButton = document.createElement('button')
    likeButton.type = 'button'
    likeButton.className = 'card__like-button'

    cardDescription.append(cardTitle ,likeButton)
    card.append(img, deleteButton, cardDescription)

    return card;
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
    addEvetListeners();
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
function addEvetListeners() {
    // Повешал обработчик события на все кнопки лайка
    document.querySelectorAll(".card__like-button").forEach(likeBtn => {
        likeBtn.addEventListener("click", () => {
            likeBtn.classList.toggle("card__like-button_is-active");
            console.log(likeBtn);
        })
    })

    // Повешал обработчик события на все кнопки удаления
    document.querySelectorAll(".card__delete-button").forEach(deleteBtn => {
        deleteBtn.addEventListener("click", () => {
            deleteBtn.closest('.places__item').style.display = "none";
        })
    })

    // Модалка с картинкой
    document.querySelectorAll(".card__image").forEach(img => {
        img.addEventListener("click", () => {
            imgModal.querySelector('.popup__image').src = img.src;
            imgModal.querySelector(".popup__caption").textContent = img.alt;
            handleOpenModal(imgModal);
        })
    })

    // Событие редактирования профиля
    profileEditBtn.addEventListener("click", () => {
        nameInput.value = profileTitle.textContent;
        descriptionInput.value = profileDescription.textContent;
        handleOpenModal(profileEditModal);
    })

    // событие добавления карточки
    cardAddForm.addEventListener("submit", onSubmitAddCardForm);

    // Повешал обработчик события на все кнопки закрытия модалки
    modalCloseBtns.forEach(closeModal => {
        closeModal.addEventListener("click", () => {
            handleCloseModal();
        });
    });

    // Сабмит изменения профиля
    profileEditForm.addEventListener("submit", onSubmitEditProfileForm);

    // Событие открытия модального окна добавления карточки
    cardAddBtn.addEventListener("click", () => {handleOpenModal(cardAddModal)})
}

// Рендер карточек
renderCards();

