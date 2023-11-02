document.addEventListener('DOMContentLoaded', function () {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const caja = document.querySelector('.caja .suma');
    let sumaSubtotales = 0;

    // Iterar sobre los productos en el carrito y crear elementos HTML
    carrito.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('productTotal');

        const nombreProducto = document.createElement('p');
        nombreProducto.textContent = producto.nombre;
        productoDiv.appendChild(nombreProducto);

        const cantidadProducto = document.createElement('p');
        cantidadProducto.textContent = `x${producto.cantidad}`;
        productoDiv.appendChild(cantidadProducto);

        const subtotal = producto.precio * producto.cantidad;
        sumaSubtotales += subtotal;

        const subtotalProducto = document.createElement('p');
        subtotalProducto.textContent = `$${subtotal}`;
        productoDiv.appendChild(subtotalProducto);

        caja.appendChild(productoDiv);
    });

    // Mostrar la suma de los subtotales en el contenedor de total
    const totalContainer = document.querySelector('.caja .total p:nth-child(2)');
    totalContainer.textContent = `$${sumaSubtotales}`;

    // Agregar un controlador de eventos para el botón "CONTINUAR"
    const btnContinuar = document.querySelector('.btnContinuar');
    btnContinuar.addEventListener('click', function () {
        // Redirigir a la página de pago o realizar otras acciones al hacer clic en "CONTINUAR"
        // ...
    });
});
