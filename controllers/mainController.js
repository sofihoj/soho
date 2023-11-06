const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");

const controller = {
    index: (req, res) => {
        res.render('index')
    },
    productCart: async (req, res) => {
        const isLogged = req.session.userLogged ? true : false;
        res.render('productCart', { isLogged });
    },
    productDetail: (req, res) => {
        const categoriaSeleccionada = req.params.category;
        const productoSeleccionado = req.params.product;

        db.Categoria.findOne({
            where: {
                categoria: formatearGuion(categoriaSeleccionada)
            }
        })
            .then(categoria => {
                if (categoria) {
                    db.Producto.findOne({
                        where: {
                            nombre: formatearGuion(productoSeleccionado)
                        },
                        include: ['categoria', 'tamanio']
                    })
                        .then(producto => {
                            if (producto) {
                                res.render('productDetail', { producto, categoria: producto.categoria.categoria, formatearEspacio });
                            } else {
                                res.send(`Producto  ${req.params.product} inexistente`);
                            }
                        });
                } else {
                    res.send(`Categoría ${req.params.category} inexistente`);
                }
            })
    },
    allProducts: async (req, res) => {
        const page = req.query.page || 1; // Obtener el número de página de la consulta de la URL o establecer el valor predeterminado como 1
        const productsPerPage = 16; // Número de productos por página

        try {
            const totalProducts = await db.Producto.count(); // Obtener el número total de productos
            const totalPages = Math.ceil(totalProducts / productsPerPage); // Calcular el número total de páginas
            const offset = (page - 1) * productsPerPage; // Calcular el valor de offset para la consulta

            const sortField = req.query.sort || 'nombre';
            const sortOrder = req.query.order || 'asc';

            const productos = await db.Producto.findAll({
                include: ['categoria'],
                offset: offset,
                limit: productsPerPage,
                order: [[sortField, sortOrder]]
            });
            res.render('allProducts', { productos, formatear, formatearEspacio, currentPage: Number(page), totalPages, req });
        } catch (error) {
            console.error('Error al obtener productos de la base de datos:', error);
            res.status(500).send('Error interno del servidor');
        }
    },
    categories: (req, res) => {
        const categoriaSeleccionada = req.params.categoria;
        const sortField = req.query.sort || 'nombre';
        const sortOrder = req.query.order || 'asc';

        db.Categoria.findOne({
            where: {
                categoria: formatearGuion(categoriaSeleccionada),
            },
            include: [{
                model: db.Producto,
                as: 'productos',
            }],
            order: [[{ model: db.Producto, as: 'productos' }, sortField, sortOrder]],
        })
            .then(categoria => {
                if (categoria) {
                    res.render('categories', { producto: categoria.productos, categoria, categoriaSeleccionada, formatearEspacio });
                } else {
                    res.send('Categoría inválida');
                }
            })
            .catch(error => {
                console.error(error);
                res.status(500).send('Error interno del servidor');
            });
    },
    search: (req, res) => {
        const searchProduct = req.query.search;
        db.Producto.findAll({
            include: ['categoria'],
            where: { nombre: {[Op.like]: "%"+searchProduct+"%"}}
        })
        .then((productos)=>{
            if (productos.length > 0){
                res.render('search', {productos, formatearEspacio, searchProduct} )
            } else {
                const sinResultados = `No se encontraron resultados de tu búsqueda "${searchProduct}"`;
                res.render('search', {productos, formatearEspacio, sinResultados} )
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        })
    },
    about: (req, res) => {
        res.render('about')
    },
    contact: (req, res) => {
        res.render('contact')
    },
}

function formatear(categoria) {
    return categoria
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\b\w/g, c => c.toUpperCase());
}

function formatearEspacio(categoryName) {
    return categoryName.replace(' ', '-').toLowerCase();
}

function formatearGuion(categoryName) {
    return categoryName.replace('-', ' ').toLowerCase();
}

module.exports = controller