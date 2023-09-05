const path = require('path');
const fs = require('fs');

let productos2 = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../databaseJSON/productos2.json')));

const controller = {
    administrar: (req, res) => {
        res.render('admin/administrar', {productos2, formatear })
    },
    create: (req, res) => {
        res.render('admin/crear')
    },
    save: (req, res) => {
        let { nombre, descripcion, precio, categoria } = req.body;
        let id = productos2.length + 1;
        let nuevoProducto = {
            id: id,
            nombre: nombre,
            descripcion: descripcion,
            precio: precio,
            categoria: transformToCamelCase(categoria),
            imagen: req.file.filename,
            //el nombre de la imagen lo obtengo de multer
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
        const productoEditar = productos2.find(producto => producto.nombre === nombreProducto)
        res.render('admin/editar', { producto: productoEditar, transformToCamelCase });
    },
    update: (req, res) => {
        const nombreProducto = req.params.nombre;
        let actualizarProducto = productos2.map(producto => {
            if (producto.nombre === nombreProducto) {
                if (req.file) {
                    producto.imagen = req.file.filename;
                } else {
                    producto.imagen = req.body.oldImagen;
                }
                producto = {
                    ...producto,
                    ...req.body
                };
            }
            return producto;
        });
        fs.writeFileSync(path.resolve(__dirname, '../database/productos2.json'), JSON.stringify(actualizarProducto, null, 2));
        res.redirect('/administrar');
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