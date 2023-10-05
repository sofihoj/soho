// function showError(inputElement, errorMessage) {
//     const errorElement = document.createElement('p');
//     errorElement.className = 'error';
//     inputElement.classList.remove('is-valid');
//     inputElement.classList.add('input-error');
//     errorElement.innerHTML = errorMessage;
//     if (inputElement.nextElementSibling) {
//         inputElement.parentElement.removeChild(inputElement.nextElementSibling);
//     }
//     inputElement.parentElement.insertBefore(errorElement, inputElement.nextElementSibling);
// }

// function clearError(inputElement) {
//     inputElement.classList.remove('input-error');
//     inputElement.classList.add('is-valid');
//     if (inputElement.nextElementSibling) {
//         inputElement.parentElement.removeChild(inputElement.nextElementSibling);
//     }
// }

// function blurInput(input) {
//     input.classList.remove('input-error');
//     input.parentElement.removeChild(input.nextElementSibling);
// }

// // export {showError, clearError, blurInput}
// module.exports = {showError, clearError, blurInput}