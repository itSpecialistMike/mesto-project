import { createCard } from './cards'
import { handleCloseModal } from './modals'
import {patchAvatar, patchUser} from "./api";
import {renderProfile} from "./profile";


const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Сериализация форм
function serializeForm(formNode) {
    const formData = new FormData(formNode);
    return Object.fromEntries(formData);
}

// Сабмит формы редактирования профиля
function onSubmitEditProfileForm(e) {
    const btn = e.target.querySelector('.popup__button')
    const origText = btn.textContent
    btn.textContent = 'Сохранение...';

    e.preventDefault()
    const { name, description } = serializeForm(e.target)
    handleCloseModal();
    patchUser(name, description)
        .then(() => {
            renderProfile()
            handleCloseModal()
        })
        .finally(() => {
            btn.textContent = origText
        })
}

// Сабмит добавления карточки
function onSubmitAddCardForm(e) {
    const btn = e.target.querySelector('.popup__button')
    const origText = btn.textContent
    btn.textContent = 'Сохранение...';

    e.preventDefault()
    const { 'place-name':name, link } = serializeForm(e.target)
    createCard(name, link);
    e.target.reset()
    handleCloseModal()
    btn.textContent = origText
}

function onSubmitUpdAvatarForm(e) {
    const btn = e.target.querySelector('.popup__button')
    const origText = btn.textContent
    btn.textContent = 'Сохранение...';

    e.preventDefault()
    const {'avatar-url': avatar} = serializeForm(e.target)
    patchAvatar(avatar)
        .then(() => {
            e.target.reset()
            renderProfile()
            handleCloseModal()
        })
        .finally(() => {
            btn.textContent = origText
        })
}

export {
    serializeForm,
    onSubmitEditProfileForm,
    onSubmitAddCardForm,
    onSubmitUpdAvatarForm,
    profileTitle,
    profileDescription,
}

