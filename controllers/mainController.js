const path = require('path');
const fs = require('fs');

let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../database/productos.json')));

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
        res.render('productDetail')
    },
    categories: (req, res) => {
        const categoriaSeleccionada = req.params.categoria;
        const categoriaEncontrada = productos.find(categoria => categoria.categoria === categoriaSeleccionada)
        tituloCategoria = formatearNombreCategoria(categoriaEncontrada.categoria)
        const productosCategoria = categoriaEncontrada.productos
        res.render('categories', {categoria: tituloCategoria, productos: productosCategoria})
    }
}

function formatearNombreCategoria(categoria) {
    const palabras = categoria.replace(/([A-Z])/g, ' $1').trim().split(' ');
    const palabrasCapitalizadas = palabras.map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1));
    return palabrasCapitalizadas.join(' ');
}

module.exports = controller