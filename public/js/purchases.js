const tbody = document.querySelector("table tbody");
                const tfoot = document.querySelector("table tfoot");
                // Obtén los datos del carrito desde localStorage
                const cart = JSON.parse(localStorage.getItem("carrito")) || [];

                // Función para renderizar los datos del carrito en la tabla
                function renderizarCarrito() {
                    tbody.innerHTML = ""; // Limpia el contenido anterior de la tabla

                    let total = 0;

                    // Recorre los productos en el carrito y crea las filas de la tabla
                    cart.forEach((product) => {
                        const subtotal = product.precio * product.cantidad;
                        total += subtotal;

                        // Crea una nueva fila de la tabla con los datos del producto
                        const row = document.createElement("tr");
                        row.innerHTML = `
                            <td>${product.nombre}</td>
                            <td>$${product.precio}</td>
                            <td>${product.cantidad}</td>
                            <td>$${subtotal}</td>
                        `;

                        // Agrega la fila a la tabla
                        tbody.appendChild(row);
                    });

                    // Crea una fila adicional en el pie de la tabla para mostrar el total
                    const totalRow = document.createElement("tr");
                    totalRow.innerHTML = `
                        <td colspan="3">Total</td>
                        <td>$${total}</td>
                    `;

                    // Agrega la fila del total al tbody de la tabla
                    tfoot.appendChild(totalRow);
                }

                // Llama a la función para renderizar el carrito al cargar la página
                window.onload = renderizarCarrito;