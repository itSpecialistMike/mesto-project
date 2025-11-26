const cardAddModal = document.querySelector(".popup_type_new-card");
const imgModal = document.querySelector(".popup_type_image");
const profileEditModal = document.querySelector(".popup_type_edit");
const updAvatarModal = document.querySelector(".popup_type_updAvatar");
const modalCloseBtns = document.querySelectorAll(".popup__close");

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

export {
    handleEsc,
    handleOpenModal,
    handleCloseModal,
    cardAddModal,
    imgModal,
    profileEditModal,
    updAvatarModal,
    modalCloseBtns,
}