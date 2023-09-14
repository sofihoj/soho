let User = require('../models/User');
const db = require('../database/models')

async function userLoggedMiddleware(req, res, next) {
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;

    if (emailInCookie) {
        let userCookie = await db.Usuario.findOne({ where: { email: emailInCookie } });
        if (userCookie) {
            req.session.userLogged = userCookie;
        }

    }
    if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    next();
}

module.exports = userLoggedMiddleware