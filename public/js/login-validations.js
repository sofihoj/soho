window.onload = function() {
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const form = document.querySelector('form');
    const emailValido = /^([a-zA-Z0-9._%-]+)@([a-zA-Z0-9.-]+)\.([a-zA-Z]{2,})$/

    /* Email input validation */
    email.onblur = function() {
        validateEmail();
    }

    email.onfocus = function () {
        blurInput(email);
    }

    /* Password input validation */
    password.onblur = function() {
        validatePassword();
    }

    password.onfocus = function () {
        blurInput(password);
    }

    form.addEventListener('submit', (e) => {
        validateEmail();
        validatePassword();

        const errorElements = document.querySelectorAll('.error');
        if(errorElements.length>0) {
            e.preventDefault()
        }

        /* Versión larga */
            // if (email.value === '') {
            //     email.classList.add('input-error');
            //     emailErrMsg.innerHTML = "Ingrese su email"
            //     email.parentElement.insertBefore(emailErrMsg, email.nextElementSibling)
            // } else if (!emailValido.test(email.value)) {
            //     email.classList.remove('is-valid');
            //     email.classList.add('input-error');
            //     emailErrMsg.innerHTML = "Ingrese un formato de email válido";
            //     email.parentElement.insertBefore(emailErrMsg, email.nextElementSibling);
            // }

            // if (password.value === '') {
            //     password.classList.add('input-error');
            //     passwordErrMsg.innerHTML = "Ingrese su contraseña";
            //     password.parentElement.insertBefore(passwordErrMsg, password.nextElementSibling);
            // }

            // if (emailErrMsg || passwordErrMsg) {
            //     e.preventDefault();
            // }
        /*-------------------------*/
    });

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

    function validateEmail() {
        if(email.value === '') {
            showError(email, "Ingrese su email");
        } else if (!emailValido.test(email.value)) {
            showError(email, "Ingrese un email con formato válido");
        } else {
            clearError(email);
        }
    }

    function validatePassword() {
        if (password.value === '') {
            showError(password, "Ingrese su contraseña");
        } else {
            clearError(password);
        }
    }

    function blurInput(input) {
        input.classList.remove('input-error');
        input.parentElement.removeChild(input.nextElementSibling);
    }
}