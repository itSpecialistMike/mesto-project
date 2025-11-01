function showInputError(input) {
    input.classList.add("popup__input_type_error");
}

function removeInputError(input) {
    input.classList.remove("popup__input_type_error");
}

function enableValidation(form) {
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

export {
    showInputError,
    removeInputError,
    enableValidation,
    checkInputValidity,
    toggleButtonState,
}

