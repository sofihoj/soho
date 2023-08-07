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
        const { nombre, descripcion, precio, categoria, imagen } = req.body;

        const categoriaEncontrada = productos.find(c => c.categoria === categoria);
        if (categoriaEncontrada) {
            const nuevoProducto = {
                nombre: nombre,
                descripcion: descripcion,
                precio: precio,
                imagen: imagen,
            };

            categoriaEncontrada.productos.push(nuevoProducto);

            fs.writeFileSync(path.resolve(__dirname, '../database/productos.json'), JSON.stringify(productos, null, 2));

            res.redirect('/administrar');
        } else {
            res.render('error');
        }
    },
    delete: (req, res) => {
        const nombreProducto = req.params.nombre;
        const categoriaEncontrada = productos.find(categoria => categoria.productos.some(producto => producto.nombre === nombreProducto));

    if (categoriaEncontrada) {
        // Filtra los productos para eliminar el que coincide con el nombre
        categoriaEncontrada.productos = categoriaEncontrada.productos.filter(producto => producto.nombre !== nombreProducto);

        // Guardar los cambios en el JSON
        fs.writeFileSync(path.resolve(__dirname, '../database/productos.json'), JSON.stringify(productos, null, 2));

        res.redirect('/administrar'); // Redirigir a la página de administración
    } else {
        res.render('error'); // Manejar el caso si el producto no se encuentra
    }
    }
}

function formatearNombreCategoria(categoria) {
    const palabras = categoria.replace(/([A-Z])/g, ' $1').trim().split(' ');
    const palabrasCapitalizadas = palabras.map(palabra => palabra.charAt(0).toUpperCase() + palabra.slice(1));
    return palabrasCapitalizadas.join(' ');
}

module.exports = controller