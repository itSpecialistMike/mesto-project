import {fetchUser} from "./fetchs";

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

export const renderProfile = () => {
    fetchUser()
        .then(data => {
            profileTitle.textContent = data.name;
            profileDescription.textContent = data.about;
            profileAvatar.style.backgroundImage = `url(${data.avatar})`;
        })
        .catch(err => {
            console.error('Ошибка загрузки профиля:', err);
        });
}