// Obtener el estado actual del modo oscuro desde localStorage
const isDarkMode = localStorage.getItem("darkMode") === "true";

// Aplicar el modo oscuro al cuerpo de acuerdo al estado almacenado en localStorage
if (isDarkMode) {
    document.body.classList.add("dark-mode-body");
} else {
    document.body.classList.remove("dark-mode-body");
}

// Obtener el elemento del checkbox
const toggleCheckbox = document.querySelector('.toggle input');

// Sincronizar el estado del checkbox con el modo oscuro
toggleCheckbox.checked = isDarkMode;

// Función para cambiar el modo oscuro y actualizar el localStorage y el estado del checkbox
function toggleDarkMode() {
    const element = document.body;
    element.classList.toggle("dark-mode-body");

    // Verificar si el modo oscuro está activado actualmente
    const isDarkMode = element.classList.contains("dark-mode-body");

    // Guardar el estado del modo oscuro en localStorage
    localStorage.setItem("darkMode", isDarkMode.toString());

    // Sincronizar el estado del checkbox con el modo oscuro
    toggleCheckbox.checked = isDarkMode;
}


