const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Calcular la cantidad total de productos en el carrito
const cantidadTotalProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);

const cartCounter = document.getElementById('cartCounter');
cartCounter.textContent = cantidadTotalProductos.toString();
