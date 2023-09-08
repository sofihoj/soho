const path = require('path');
const fs = require('fs');
const db = require('../database/models');
//const { Producto, Categoria } = require('../database/models'); --> Asi evitaria usar db.Producto, db.Categoria, sólo sería Producto o Categoria

const controller = {
    index: (req, res) => {
        res.render('index')
    },
    newProducts: (req, res) => {
        res.render('newProducts')
    },
    productCart: (req, res) => {
        res.render('productCart')
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
            if(categoria) {
                db.Producto.findOne({
                    where: {
                        nombre: formatearGuion(productoSeleccionado)
                    },
                    include: [{
                        model: db.Categoria,
                        as: 'categoria',
                        attributes: ['categoria']
                    }]
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
    categories: (req, res) => {
        const categoriaSeleccionada = req.params.categoria;

        db.Categoria.findOne({
            where: {
                categoria: formatearGuion(categoriaSeleccionada),
            },
            include: [{
                model: db.Producto,
                as: 'productos',
                attributes: ['nombre', 'imagen', 'precio']
            }],
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
    }
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