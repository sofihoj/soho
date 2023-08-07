const path = require('path');
const fs = require('fs');

let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../database/productos.json')));

const controller = {
    administrar: (req, res) => {
        res.render('admin/administrar', {productos, formatearNombreCategoria })
    },
    create: (req, res) => {
        res.render('admin/crear')
    },
    save: (req, res) => {

    }
}

function formatearNombreCategoria(categoria) {
    const palabras = categoria.replace(/([A-Z])/g, ' $1').trim().split(' ');
    const palabrasCapitalizadas = palabras.map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1));
    return palabrasCapitalizadas.join(' ');
}

module.exports = controller