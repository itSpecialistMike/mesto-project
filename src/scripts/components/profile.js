import {fetchUser} from "./fetchs";
import {getCurrentUser, setCurrentUser} from "../state";

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
        .then(data => {
            setCurrentUser(data)
        })
        .catch(err => {
            console.error('Ошибка загрузки профиля:', err);
        });
}