const db = require('../database/models');

const purchasesController = {
    finalizePurchase: async (req, res) => {
        try {
            const carrito = JSON.parse(req.body.carrito); // Assuming you have the shopping cart data in the session

            // Calculate total price from the shopping cart
            const precioTotal = carrito.reduce((total, producto) => {
                return total + producto.precio * producto.cantidad;
            }, 0);

            // Create a new purchase record
            const nuevaCompra = await db.Compra.create({
                fecha_compra: new Date(),
                precio_total: precioTotal,
                usuario_id: req.session.userLogged.id, // ID del usuario obtenido de la sesión
            });

            // Create detail purchase records for each product in the shopping cart
            const detallesCompra = carrito.map(producto => {
                return {
                    producto_id: producto.id, // ID del producto obtenido del carrito
                    compra_id: nuevaCompra.id, // ID de la compra recién creada
                    cantidad: producto.cantidad,
                };
            });

            // Crea registros en la tabla DetalleCompras usando bulkCreate
            await db.DetalleCompra.bulkCreate(detallesCompra);

            // Redirect or render a success page
            return res.redirect('/users/profile'); // Redirect to a success page after purchase
        } catch (error) {
            console.error(error);
            return res.status(500).send('Error en el servidor');
        }
    },
    // viewPurchaseDetails: async (req, res) => {
    //     try {
    //         const purchaseId = req.params.id; // Assuming you pass the purchase ID in the URL
    //         const purchase = await db.Compra.findByPk(purchaseId, {
    //             include: [{
    //                 model: db.DetalleCompra,
    //                 as: 'detallesCompra',
    //                 include: [{
    //                     model: db.Producto,
    //                     as: 'productos'
    //                 }]
    //             }]
    //         });

    //         if (!purchase) {
    //             // Handle the case where the purchase ID is not found
    //             return res.status(404).send('Purchase not found');
    //         }

    //         // Render the purchase details in your view
    //         res.render('users/purchaseDetail', { purchase });
    //     } catch (error) {
    //         console.error(error);
    //         return res.status(500).send('Error in fetching purchase details');
    //     }
    // }
}

module.exports = purchasesController;