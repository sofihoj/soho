const db = require('../../database/models')

const productsAPIController = {
    list: (req, res) => {
        db.Producto.findAll({
            include: {
                model: db.Categoria,
                as: 'categoria',
            }
        })
        .then(productos => {
            const productsData = productos.map(producto => ({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                categoria: producto.categoria.categoria,
                imagen: producto.imagen,
                descripcion: producto.descripcion
            }))
            res.send(productsData);
        })
    },
    detail: (req, res) => {
        const productId = req.params.id;

        db.Producto.findOne({
            where: { id: productId },
            include: {
                model: db.Categoria,
                as: 'categoria',
            },
        })
        .then(producto => {
            if (!producto) {
                return res.status(404).send({ error: 'Producto no encontrado' });
            } else {
                const productData = {
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: parseFloat(producto.precio),
                    categoria: producto.categoria.categoria,
                    imagen: producto.imagen,
                    descripcion: producto.descripcion
                };
                return res.send(productData);
            }
        })
        .catch(error => {
            console.error(error);
            return res.status(500).send({ error: 'Error interno del servidor' });
        });
    }
}

module.exports = productsAPIController;