document.addEventListener('DOMContentLoaded', function () {
    const menosButton = document.getElementById('menos');
    const masButton = document.getElementById('mas');
    const cantidadAgregarInput = document.getElementById('cantidadAgregar');
    const addButton = document.getElementById('add');

    // Obtener el producto actual
    const productoId = addButton.getAttribute('data-id');
    const nombre = addButton.getAttribute('data-nombre');
    const precio = parseFloat(addButton.getAttribute('data-precio'));
    const imagen = addButton.getAttribute('data-imagen');

    // Verificar si el producto ya está en el carrito
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoEnCarrito = carrito.find(item => item.id === productoId);

    // Configurar la cantidad inicial en el input
    if (productoEnCarrito) {
        cantidadAgregarInput.value = productoEnCarrito.cantidad;
    }

    // Función para actualizar la cantidad en el carrito
    function actualizarCantidadEnCarrito(cantidad) {
        const productoEnCarritoIndex = carrito.findIndex(item => item.id === productoId);

        if (productoEnCarritoIndex !== -1) {
            // Si el producto ya está en el carrito, aumentar la cantidad
            carrito[productoEnCarritoIndex].cantidad += parseInt(cantidadAgregarInput.value);
        } else {
            // Si el producto no está en el carrito, agregarlo con la cantidad
            carrito.push({ id: productoId, nombre, precio, imagen, cantidad: parseInt(cantidadAgregarInput.value) });
        }

        localStorage.setItem('carrito', JSON.stringify(carrito));
        // Restablecer el valor del input a 0 después de agregar el producto al carrito
        cantidadAgregarInput.value = 1;
    }

    // Manejar el clic en el botón "-"
    menosButton.addEventListener('click', function () {
        let cantidad = parseInt(cantidadAgregarInput.value);
        if (cantidad > 1) {
            cantidad--;
            cantidadAgregarInput.value = cantidad;
        }
    });

    // Manejar el clic en el botón "+"
    masButton.addEventListener('click', function () {
        let cantidad = parseInt(cantidadAgregarInput.value);
        cantidad++;
        cantidadAgregarInput.value = cantidad;
    });

    // Manejar el clic en el botón "AGREGAR AL CARRITO"
    addButton.addEventListener('click', function () {
        actualizarCantidadEnCarrito(cantidadAgregarInput.value);
        //alert('Producto agregado al carrito');
        const notificacion = document.getElementById('notificationDetail');
            notificacion.textContent = `Producto agregado al carrito.`;
            notificacion.style.display = 'block';

            setTimeout(function () {
                notificacion.style.display = 'none';
            }, 2000);
    });
});
