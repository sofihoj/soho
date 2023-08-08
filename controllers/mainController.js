const path = require('path');
const fs = require('fs');

let productos2 = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../database/productos2.json')));

const controller = {
    index: (req, res) => {
        res.render('index')
    },
    signup: (req, res) => {
        res.render('users/signup')
    },
    login: (req, res) => {
        res.render('users/login')
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
        const producto = productos2.find(producto => producto.nombre === productoSeleccionado)
        const categoriasValidas = [...new Set(productos2.map(producto => producto.categoria))];
        const nombresExistentes = [...new Set(productos2.map(producto => producto.nombre))];
        if (nombresExistentes.includes(productoSeleccionado) && categoriasValidas.includes(categoriaSeleccionada)) {
            res.render('productDetail', {producto, formatear})
        } else {
            res.send("Producto inexistente")
        }
    },
    categories: (req, res) => {
        const categoriaSeleccionada = req.params.categoria;
        const producto = productos2.filter(producto => producto.categoria === categoriaSeleccionada)
        const categoriasValidas = [...new Set(productos2.map(producto => producto.categoria))];
        if (categoriasValidas.includes(categoriaSeleccionada)) {
            res.render('categories', {producto, categoriaSeleccionada, formatear})
        } else {
            res.send("Categoría inválida")
        }

    }
}

function formatear(categoria) {
    return categoria
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b\w/g, c => c.toUpperCase());
  }

module.exports = controller