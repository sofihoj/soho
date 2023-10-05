window.onload = function() {
    const productName = document.querySelector('#formProductName');
    const productDescription = document.querySelector('#descripcion');
    const productPrice = document.querySelector('#precio');
    const category = document.querySelector('#categoria');
    const productImg = document.querySelector('#imagen');
    const form = document.querySelector('form');
    const validFormat = /^(?! )[a-zA-Z][a-zA-Z0-9\s\-\.\/:"'()]+(?<! )$/;
    const numbers = /^\d+$/;

    productName.onblur = () => validateName(productName);
    productName.onfocus = () => blurInput(productName);

    productPrice.onblur = () => validatePrice();
    productPrice.onfocus = () => blurInput(productPrice);

    category.onblur = () => emptyInput(category, "Elija una categoría");
    category.onfocus = () => blurInput(category);

    productImg.onblur = () => validateImg();
    productImg.onfocus = () => blurInput(productImg)

    form.addEventListener('submit', (e) => {
        validateName(productName);
        validatePrice();
        emptyInput(category, "Elija una categoría");
        validateImg();

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

    function blurInput(input) {
        input.classList.remove('input-error');
        input.parentElement.removeChild(input.nextElementSibling);
    }

    function validateName(inputElement) {
        if(inputElement.value === '') {
            showError(inputElement, "Campo obligatorio");
        } else if (inputElement.value.length < 2) {
            showError(inputElement, "Debe tener al menos 2 caracteres");
        } else if(!validFormat.test(inputElement.value)) {
            showError(inputElement, "No puede consistir solo de números y/o caracteres especiales");
        } else {
            clearError(inputElement);
        }
    }

    function validatePrice() {
        if(productPrice.value === '') {
            showError(productPrice, "Campo obligatorio");
        } else if(!numbers.test(productPrice.value)) {
            showError(productPrice, "Ingrese sólo números sin guiones ni espacios");
        } else {
            clearError(productPrice);
        }
    }

    function emptyInput(inputElement, msgErr) {
        if(inputElement.value === '') {
            showError(inputElement, msgErr);
        } else {
            clearError(inputElement)
        }
    }

    function validateImg() {
        var filePath = productImg.value;
        var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;
        if (productImg.value === '') {
            showError(productImg, "Carga una imagen del producto");
        } else if (!allowedExtensions.exec(filePath)) {
            showError(productImg, "Sólo se permiten archivos .jpg/.jpeg/.png/.gif");
            productImg.value = '';
            return false;
        } else {
            productImg.classList.remove('input-error');
            if (productImg.nextElementSibling) {
                productImg.parentElement.removeChild(productImg.nextElementSibling);
            }
        }
    }
}