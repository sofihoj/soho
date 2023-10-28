const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator')
const db = require('../database/models');


const User = require('../models/User');

const usersController = {
    signup: (req, res) => {
        res.render('users/signup')
    },
    processRegister: async (req, res) => {
        try {
            const registerValidation = validationResult(req);

            if (registerValidation.errors.length > 0) {
                return res.render('users/signup', {
                    errors: registerValidation.mapped(),
                    oldData: req.body
                });
            }

            const { name, lastName, email, phoneNumber, city, address, password } = req.body;

            const existingUser = await db.Usuario.findOne({ where: { email } });

            if (existingUser) {
                return res.render('users/signup', {
                    errors: {
                        email: {
                            msg: 'Este email ya está registrado'
                        }
                    },
                    oldData: req.body
                });
            }

            await db.Usuario.create({
                nombre: name,
                apellido: lastName,
                email: email,
                contraseña: bcrypt.hashSync(password, 10),
                telefono: phoneNumber,
                direccion: address,
                ciudad: city,
                tipo_usuario_id: 2,
            });

            return res.redirect('/users/login');
        } catch (error) {
            console.error(error);
            return res.status(500).send('Error en el servidor');
        }
    },
    login: (req, res) => {
        res.render('users/login');
    },
    processLogin: (req, res) => {
        const loginValidation = validationResult(req);
        if (loginValidation.errors.length > 0) {
            return res.render('users/login', {
                errors: loginValidation.mapped(), //mapped() convierte el array errors de registerValidation en un objeto literal donde cada uno tiene las propiedades de origen
                oldData: req.body
            })
        }
        const { email, password } = req.body;
        db.Usuario.findOne({ where: { email } })
        .then(userToLogin => {
            if (!userToLogin) {
                return res.render('users/login', {
                    errors: {
                        email: {
                            msg: 'Usuario no registrado'
                        }
                    },
                });
            }

            const isOkThePassword = bcrypt.compareSync(password, userToLogin.contraseña);

            if (isOkThePassword) {
                // Eliminar la contraseña antes de almacenarla en la sesión
                delete userToLogin.contraseña;
                req.session.userLogged = userToLogin; // Guardar la sesión del usuario

                if (req.body.remember_user) {
                    res.cookie('userEmail', email, { maxAge: (1000 * 60) * 60 });
                }

                if (userToLogin.tipo_usuario_id === 2) {
                    return res.redirect('/users/profile');
                } else if (userToLogin.tipo_usuario_id === 1) {
                    return res.redirect('/administrar');
                }
            } else {
                return res.render('users/login', {
                    errors: {
                        password: {
                            msg: 'Contraseña incorrecta'
                        }
                    },
                    oldData: req.body
                });
            }
        })
        .catch(error => {
            console.error(error);
            return res.status(500).send('Error en el servidor');
        });
    },
    profile: (req, res) => {
        const userCategory = req.session.userLogged.tipo_usuario_id;

        if (userCategory === 1) {
            return res.redirect('/administrar');
        } else if (userCategory === 2) {
            return res.render('users/profile', {
                user: req.session.userLogged
            });
        } else {
            return res.status(400).send('Categoría de usuario desconocida');
        }
    },
    edit: (req, res) => {
        res.render('users/editProfile', { user: req.session.userLogged });
    },
    update: (req, res) => {
        const validationErrors = validationResult(req);

        if (validationErrors.errors.length > 0) {
            // Hay errores de validación, muestra los mensajes de error en la vista
            return res.render('users/editProfile', {
                errors: validationErrors.mapped(),
                oldData: req.body,
                user: req.session.userLogged
            });
        }

        let userId = req.session.userLogged.id
        db.Usuario
            .update({
                    nombre: req.body.name,
                    apellido: req.body.lastName,
                    email: req.body.email,
                    telefono: req.body.phoneNumber,
                    direccion: req.body.address,
                    ciudad: req.body.city
                },
                {
                    where: {id:userId}
                })
                .then(() => {
                    // Después de la actualización en la base de datos, actualiza la sesión del usuario
                    return db.Usuario.findByPk(userId); // Recupera los datos actualizados del usuario
                })
                .then(updatedUser => {
                    // Actualiza la sesión con los datos actualizados del usuario
                    req.session.userLogged = updatedUser.get({ plain: true });

                    return res.redirect('/users/profile');
                })
    },
    changePassword: async (req, res) => {
        const validationErrors = validationResult(req);

        if (validationErrors.errors.length > 0) {
            return res.render('users/editProfile', {
                errors: validationErrors.mapped(),
                oldData: req.body,
                user: req.session.userLogged
            });
        }

        const userId = req.session.userLogged.id; // ID del usuario autenticado
        const { password, newPassword, repeatPassword } = req.body;
        try {
            // Buscar al usuario por su ID
            const user = await db.Usuario.findByPk(userId);
            // Verificar si la contraseña actual coincide
            const isPasswordValid = await bcrypt.compare(password, user.contraseña);

            if (!isPasswordValid) {
                // La contraseña actual no coincide, muestra un mensaje de error
                return res.render('users/editProfile', {
                    errors: {
                        password: {
                            msg: 'La contraseña actual es incorrecta'
                        }
                    },
                    oldData: req.body,
                    user: req.session.userLogged
                });
            }
            // Hash de la nueva contraseña
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            // Actualizar la contraseña del usuario en la base de datos
            await user.update({
                contraseña: hashedPassword
            });
            // Redirigir al perfil del usuario después de cambiar la contraseña
            return res.redirect('/users/profile');
        } catch (error) {
            console.error(error);
            return res.status(500).send('Error interno del servidor');
        }
    },
    destroy: (req, res) => {
        //const userId = req.session.userLogged.id; // ID del usuario autenticado

        db.Usuario
        .destroy({
            where: {
                id: req.session.userLogged.id
            }, force: true
        })
        .then(req.session.destroy())
        // .then(() => {
        //     return res.redirect('/')
        // })
        .catch(error => res.send(error))
    },
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }
}

module.exports = usersController;