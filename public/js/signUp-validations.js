window.onload = function() {
    const name = document.querySelector('#formName');
    const lastName = document.querySelector('#formLastName');
    const email = document.querySelector('#email');
    const phoneNumber = document.querySelector('#formNumber');
    const city = document.querySelector('#city');
    const address = document.querySelector('#address');
    const password = document.querySelector('#password');
    const passwordRepeat = document.querySelector('#passwordRepeat');
    const form = document.querySelector('form');
    const emailValido = /^([a-zA-Z0-9._%-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$/
    const letters = /^[a-zA-Z]+(\s[a-zA-Z]+)*$/;
    const numbers = /^\d+$/;
    const addressInput = /^(?=.*[a-zA-Z0-9])[a-zA-Z0-9\s\-\.\/:"'()]+$/;
    const passwordInput = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    name.onblur = () => validateName(name);
    name.onfocus = () => focusInput(name);

    lastName.onblur = () => validateName(lastName);
    lastName.onfocus = () => focusInput(lastName);

    email.onblur = () => validateEmail();
    email.onfocus = () => focusInput(email);

    phoneNumber.onblur = () => validateNumber();
    phoneNumber.onfocus = () => focusInput(phoneNumber);

    city.onblur = () => validateName(city);
    city.onfocus = () => focusInput(city);

    address.onblur = () => emptyInput(address, "Campo obligatorio");
    address.onfocus = () => focusInput(address);

    password.onblur = () => validatePassword();
    password.onfocus = () => focusInput(password);

    passwordRepeat.onblur = () => {
        if(passwordRepeat.value === '') {
            showError(passwordRepeat, "Campo obligatorio");
        } else if(passwordRepeat.value !== password.value) {
            showError(passwordRepeat, "Las contraseñas no coinciden")
        } else {
            clearError(passwordRepeat);
        }
    }
    passwordRepeat.onfocus = () => {
        focusInput(passwordRepeat);
    }

    form.addEventListener('submit', (e) => {
        validateName(name);
        validateName(lastName);
        validateEmail();
        validateNumber();
        validateName(city);
        emptyInput(address, "Campo obligatorio");
        validatePassword();
        if(passwordRepeat.value === '') {
            showError(passwordRepeat, "Campo obligatorio");
        } else if(passwordRepeat.value !== password.value) {
            showError(passwordRepeat, "Las contraseñas no coinciden")
        } else {
            clearError(passwordRepeat);
        }

        const errorElements = document.querySelectorAll('.error');
        if(errorElements.length>0) {
            e.preventDefault()
        }
    })

    function showError(inputElement, errorMessage) {
        const errorElement = document.createElement('p');
        errorElement.className = 'error';
        inputElement.classList.remove('is-valid');
        inputElement.classList.add('input-error');
        errorElement.innerHTML = errorMessage;
        if (inputElement.nextElementSibling) {
            inputElement.parentElement.removeChild(inputElement.nextElementSibling);
        }
        inputElement.parentElement.insertBefore(errorElement, inputElement.nextElementSibling);
    }

    function clearError(inputElement) {
        inputElement.classList.remove('input-error');
        inputElement.classList.add('is-valid');
        if (inputElement.nextElementSibling) {
            inputElement.parentElement.removeChild(inputElement.nextElementSibling);
        }
    }

    function emptyInput(inputElement, msgErr) {
        if(inputElement.value === '') {
            showError(inputElement, msgErr);
        } else if(!addressInput.test(inputElement.value)) {
            showError(inputElement, "No puede incluir sólo caracteres vacíos")
        } else {
            clearError(inputElement)
        }
    }

    function validateName(inputElement) {
        if(inputElement.value === '') {
            showError(inputElement, "Campo obligatorio");
        } else if (inputElement.value.length < 2) {
            showError(inputElement, "Debe tener al menos 2 caracteres");
        } else if(!letters.test(inputElement.value)) {
            showError(inputElement, "Sólo debe contener letras");
        } else {
            clearError(inputElement);
        }
    }

    function focusInput(input) {
        input.classList.remove('input-error');
        input.parentElement.removeChild(input.nextElementSibling);
    }

    function validateEmail() {
        if(email.value === '') {
            showError(email, "Campo obligatorio");
        } else if (!emailValido.test(email.value)) {
            showError(email, "Ingrese un email con formato válido");
        } else {
            clearError(email);
        }
    }

    function validateNumber() {
        if(phoneNumber.value === '') {
            showError(phoneNumber, "Campo obligatorio");
        } else if(!numbers.test(phoneNumber.value)) {
            showError(phoneNumber, "Ingrese sólo números sin guiones ni espacios");
        } else if(phoneNumber.value.length < 7) {
            showError(phoneNumber, "Debe tener al menos 7 números");
        } else {
            clearError(phoneNumber);
        }
    }

    function validatePassword() {
        if(password.value === '') {
            showError(password, "Campo obligatorio");
        } else if (!passwordInput.test(password.value)) {
            showError(password, "La contraseña debe tener al menos 8 caracteres y contener al menos una letra mayúscula, una minúscula, un número y un carácter especial");
        } else {
            clearError(password);
        }
    }
}