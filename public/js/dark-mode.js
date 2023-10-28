// // Obtener el estado actual del modo oscuro desde localStorage
// const isDarkMode = localStorage.getItem("darkMode") === "true";

// // Aplicar el modo oscuro al cuerpo de acuerdo al estado almacenado en localStorage
// if (isDarkMode) {
//     document.body.classList.add("dark-mode-body");
// } else {
//     document.body.classList.remove("dark-mode-body");
// }

// // Obtener el elemento del checkbox
// const toggleCheckbox = document.querySelector('.toggle input');

// // Sincronizar el estado del checkbox con el modo oscuro
// toggleCheckbox.checked = isDarkMode;

// // Función para cambiar el modo oscuro y actualizar el localStorage y el estado del checkbox
// function toggleDarkMode(toggleType) {
//     const element = document.body;
//     element.classList.toggle("dark-mode-body");

//     // Verificar si el modo oscuro está activado actualmente
//     const isDarkMode = element.classList.contains("dark-mode-body");

//     // Guardar el estado del modo oscuro en localStorage
//     localStorage.setItem(toggleType, isDarkMode.toString());

//     // Sincronizar el estado del checkbox con el modo oscuro
//     toggleCheckbox.checked = isDarkMode;
// }
document.addEventListener("DOMContentLoaded", function() {
    const isHeaderDarkMode = localStorage.getItem("header") === "true";
    const isSidebarDarkMode = localStorage.getItem("sidebar") === "true";

    // Establecer el estado inicial de los toggles
    document.querySelector(".toggle-header input[type='checkbox']").checked = isHeaderDarkMode;
    document.querySelector(".toggle-sidebar input[type='checkbox']").checked = isSidebarDarkMode;

    // Aplicar el modo oscuro al cuerpo de la página según el estado inicial
    if (isHeaderDarkMode) {
        document.body.classList.add("dark-mode-body");
    }
});

function toggleDarkMode(toggleType) {
    const element = document.body;
    element.classList.toggle("dark-mode-body");

    // Verificar si el modo oscuro está activado actualmente
    const isDarkMode = element.classList.contains("dark-mode-body");

    // Guardar el estado del modo oscuro en localStorage para ambos toggles
    localStorage.setItem(toggleType, isDarkMode.toString());

    // Sincronizar el estado de los toggles
    if (toggleType === "header") {
        localStorage.setItem("sidebar", isDarkMode.toString());
        document.querySelector(".toggle-sidebar input[type='checkbox']").checked = isDarkMode;
    } else if (toggleType === "sidebar") {
        localStorage.setItem("header", isDarkMode.toString());
        document.querySelector(".toggle-header input[type='checkbox']").checked = isDarkMode;
    }
}
