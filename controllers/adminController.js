const path = require('path');
const fs = require('fs');

let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../database/productos.json')));
let productos2 = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../database/productos2.json')));

const controller = {
    administrar: (req, res) => {
        res.render('admin/administrar', {productos2, formatear })
    },
    create: (req, res) => {
        res.render('admin/crear')
    },
    save: (req, res) => {
        let { nombre, descripcion, precio, categoria, imagen } = req.body;
        let id = productos2.length + 1;
        let nuevoProducto = {
            id: id,
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            categoria: transformToCamelCase(categoria),
            imagen: imagen,
        };

        productos2.push(nuevoProducto);

        fs.writeFileSync(path.resolve(__dirname, '../database/productos2.json'), JSON.stringify(productos2, null, 2));
        res.redirect('/administrar');
    },
    delete: (req, res) => {
        const nombreProducto = req.params.nombre;
        const index = productos2.findIndex(producto => producto.nombre === nombreProducto);
        if (index !== -1) {
            productos2.splice(index, 1);
            fs.writeFileSync(path.resolve(__dirname, '../database/productos2.json'), JSON.stringify(productos2, null, 2));
            res.redirect('/administrar');
        } else {
            res.render('not-found')
        }
    },
    edit: (req, res) => {
        const nombreProducto = req.params.nombre;
        const categoriaEncontrada = productos.find(categoria => categoria.productos.some(producto => producto.nombre === nombreProducto));

        if (categoriaEncontrada) {
            const producto = categoriaEncontrada.productos.find(prod => prod.nombre === nombreProducto);

            if (producto) {
                res.render('admin/editar', { producto, categoriaEncontrada });
            } else {
                res.render('error');
            }
        } else {
            res.render('error');
        }
    },
    update: (req, res) => {

    }
}

function formatear(categoria) {
    return categoria
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b\w/g, c => c.toUpperCase());
  }

  function transformToCamelCase(texto) {
    return texto.replace(/\s+(\w)/g, (_, match) => match.toUpperCase());
  }

module.exports = controller