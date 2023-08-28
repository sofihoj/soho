const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator')


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
        let existingUser = User.findByField('email', req.body.email);
        if (existingUser) {
            return res.render('users/signup', {
                errors: {
                    email: {
                        msg: 'Este email ya está registrado'
                    }
                },
                oldData: req.body
            })
        }
        let userToCreate = {
            ...req.body,
            category: "user",
            password: bcrypt.hashSync(req.body.password, 10)
        }

        let userCreated = User.create(userToCreate);

		return res.redirect('/users/login');
    },
    login: (req, res) => {
        res.render('users/login');
    },
    processLogin: (req, res) => {
        // const loginValidation = validationResult(req);
        // if (loginValidation.errors.length > 0) {
        //     return res.render('users/login', {
        //         errors: loginValidation.mapped(), //mapped() convierte el array errors de registerValidation en un objeto literal donde cada uno tiene las propiedades de origen
        //         oldData: req.body
        //     })
        // }
        let userToLogin = User.findByField('email', req.body.email);
		if(userToLogin) {
			let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password);
			if (isOkThePassword) {
				delete userToLogin.password; //para evitar que me traiga la password a la session, por seguridad
				req.session.userLogged = userToLogin; //guardo la sesión del usuario

				if(req.body.remember_user) {
					res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
				}

				if (userToLogin.category === 'admin') {
                    return res.redirect('/administrar');
                } else {
                    return res.redirect('/users/profile');
                }
			}
			return res.render('users/login', {
				errors: {
					password: {
						msg: 'Contraseña incorrecta'
					}
				}
			});
		}

		return res.render('users/login', {
			errors: {
				email: {
					msg: 'Usuario no registrado'
				}
			}
		});
    },
    // profile: (req, res) => {
    //     res.render('users/profile', {
    //         user: req.session.userLogged
    //     });
    // },
    profile: (req, res) => {
        const userCategory = req.session.userLogged.category;

        if (userCategory === 'admin') {
            return res.redirect('/administrar');
        } else if (userCategory === 'user') {
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