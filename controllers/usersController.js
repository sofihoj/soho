const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator')
const db = require('../database/models');


const User = require('../models/User');

const usersController = {
    signup: (req, res) => {
        res.render('users/signup')
    },
    processRegister: (req, res) => {
        const registerValidation = validationResult(req);
        //registerValidation es un objeto literal con una propiedad errors que es un array
        if (registerValidation.errors.length > 0) {
            return res.render('users/signup', {
                errors: registerValidation.mapped(), //mapped() convierte el array errors de registerValidation en un objeto literal donde cada uno tiene las propiedades de origen
                oldData: req.body
            })
        }

        const { name, lastName, email, phoneNumber, city, address, password } = req.body;

        db.Usuario.findOne({ where: { email } })
        .then(existingUser => {
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

            return db.Usuario.create({
                nombre: name,
                apellido: lastName,
                email: email,
                contraseña: bcrypt.hashSync(password, 10),
                telefono: phoneNumber,
                direccion: address,
                ciudad: city,
                tipo_usuario_id: 2,
            });
        })
        .then(() => {
            return res.redirect('/users/login');
        })
        .catch(error => {
            console.error(error);
            return res.status(500).send('Error en el servidor');
        });
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
    // edit: (req, res) => {
    //     res.render('users/editProfile');
    // },
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/');
    }
}

module.exports = usersController;