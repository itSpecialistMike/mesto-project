import { createCard } from './cards'
import { handleCloseModal } from './modals'


const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

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

export {
    serializeForm,
    onSubmitEditProfileForm,
    onSubmitAddCardForm,
    profileTitle,
    profileDescription,
}

