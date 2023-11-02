document.addEventListener('DOMContentLoaded', function () {
    const addToCartButtons = document.querySelectorAll('.addToCartBtn');
    const carritoContainer = document.querySelector(".caja");
    let cart = JSON.parse(localStorage.getItem("carrito")) || [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            const id = event.target.dataset.id;
            const nombre = event.target.dataset.nombre;
            const precio = event.target.dataset.precio;
            const imagen = event.target.dataset.imagen;

            // Verificar si el producto ya está en el carrito
            const existingProductIndex = cart.findIndex(product => product.id === id);

            if (existingProductIndex !== -1) {
                // Si el producto ya está en el carrito, aumentar la cantidad
                cart[existingProductIndex].cantidad++;
            } else {
                // Si el producto no está en el carrito, agregarlo con cantidad 1
                const producto = { id, nombre, precio, imagen, cantidad: 1 };
                cart.push(producto);
            }

            // Actualizar el carrito en el almacenamiento local
            localStorage.setItem('carrito', JSON.stringify(cart));
            // Volver a renderizar el carrito después de actualizar el producto
            renderizarCarrito();
        });
    });

    // Renderizar los productos del carrito en el contenedor
    function renderizarCarrito() {
        carritoContainer.innerHTML = "";
        cart.forEach((product, index) => {
            const cartItem = document.createElement("div");
            cartItem.classList.add("descripcion");
            cartItem.innerHTML = `
            <i class="fa-solid fa-circle-xmark delete-product" data-index="${index}"></i>
            <p class="cartNombre">${product.nombre}</p>
            <p class="cartPrecio">$${product.precio}</p>
            <div class="cantidad-container">
                <button class="decrement-btn" data-index="${index}">-</button>
                <span class="cantidad">${product.cantidad}</span>
                <button class="increment-btn" data-index="${index}">+</button>
            </div>
            <div class="cartImg">
                <img src="/img/${product.imagen}" alt="${product.nombre}">
            </div>
            `;

            carritoContainer.appendChild(cartItem);
        });
    }

    // Llamar a la función para renderizar el carrito al cargar la página
    renderizarCarrito();

    // Agregar un controlador de eventos para los íconos de eliminación
    carritoContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("delete-product")) {
            // Obtener el índice del producto desde el atributo data-index del ícono
            const index = event.target.getAttribute("data-index");
            // Eliminar el producto del carrito utilizando el índice
            cart.splice(index, 1);
            // Actualizar el carrito en el almacenamiento local
            localStorage.setItem("carrito", JSON.stringify(cart));
            // Volver a renderizar el carrito después de eliminar el producto
            renderizarCarrito();
        } else if (event.target.classList.contains("decrement-btn")) {
            const index = event.target.getAttribute("data-index");
            if (cart[index].cantidad > 1) {
                // Decrementar la cantidad si es mayor que 1
                cart[index].cantidad--;
                // Actualizar el carrito en el almacenamiento local
                localStorage.setItem("carrito", JSON.stringify(cart));
                // Volver a renderizar el carrito después de decrementar la cantidad
                renderizarCarrito();
            }
        } else if (event.target.classList.contains("increment-btn")) {
            const index = event.target.getAttribute("data-index");
            // Incrementar la cantidad
            cart[index].cantidad++;
            // Actualizar el carrito en el almacenamiento local
            localStorage.setItem("carrito", JSON.stringify(cart));
            // Volver a renderizar el carrito después de incrementar la cantidad
            renderizarCarrito();
        }
    });
});
