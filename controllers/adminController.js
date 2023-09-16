const db = require('../database/models');
const { validationResult } = require('express-validator')

const controller = {
    administrar: async (req, res) => {
        try {
          const productos = await db.Producto.findAll({
            include: ['categoria']
        });
          res.render('admin/administrar', { productos, formatear, formatearEspacio });
        } catch (error) {
          console.error('Error al obtener productos de la base de datos:', error);
          res.status(500).send('Error interno del servidor');
        }
      },
    create: async (req, res) => {
        try {
            const categorias = await db.Categoria.findAll();

            res.render('admin/crear', { categorias });
        } catch (error) {
            res.send(error);
        }
    },
    save: async (req, res) => {
        try {
            const categorias = await db.Categoria.findAll();
            let { nombre, descripcion, precio, categoria } = req.body;
            const createProduct = validationResult(req);
            console.log('Errores de validación:', createProduct.errors);

            if (createProduct.errors.length > 0) {
                return res.render('admin/crear', {
                    categorias,
                    errors: createProduct.mapped(),
                    oldData: req.body
                });
            } else {


            const productoExistente = await db.Producto.findOne({ where: { nombre } });

            if (productoExistente) {
                return res.render('admin/crear', {
                    categorias,
                    errors: {
                        nombre: {
                            msg: 'Ya existe un producto con este nombre'
                        }
                    },
                    oldData: req.body
                });
            }

            await db.Producto.create({
                nombre: nombre,
                precio: precio,
                imagen: req.file.filename,
                descripcion: descripcion,
                categoria_id: categoria,
            });

            return res.redirect('/administrar');
        }
        } catch {
            console.error(error);
            return res.status(500).send('Error en el servidor');
        }
    },
    delete:  (req, res) => {
        const nombre = req.params.nombre;
        db.Producto.destroy({ where: { nombre }, force: true })
        .then(() => {
            return res.redirect('/administrar')
        })
        .catch(error => res.send(error))
    },
    edit: async (req, res) => {
        try {
            const nombre = req.params.nombre;
            const producto = await db.Producto.findOne({ where: { nombre } }, {include: ['categoria']})
            const categorias = await db.Categoria.findAll();
            if (!producto) {
                return res.status(404).send('Producto no encontrado');
            }

            return res.render('admin/editar', {producto, categorias});
        } catch {
            console.error('Error en la edición de productos:', error);
            res.status(500).send('Error interno del servidor');
        }
    },
    update: (req, res) => {
        const { nombre, descripcion, precio, categoria } = req.body;
        const nombreProducto = req.params.nombre;
        const nuevaImagen = req.file;
        const oldImagen = req.body.oldImagen;

        const productoModificado = {
            nombre,
            descripcion,
            precio,
            categoria_id: categoria,
        }

        if (nuevaImagen) {
            productoModificado.imagen = nuevaImagen.filename;
        } else {
            productoModificado.imagen = oldImagen;
        }

        db.Producto
        .update(
            productoModificado,
            {
                where: {nombre: nombreProducto}
            })
        .then(()=> {
            return res.redirect('/administrar')})
        .catch(error => res.send(error))
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