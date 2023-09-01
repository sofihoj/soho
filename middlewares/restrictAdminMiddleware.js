const restrictToAdmin = (req, res, next) => {
    if (req.session.userLogged && req.session.userLogged.category === 'user') {
        return res.redirect('/users/profile'); // Redirige a la página de perfil para usuarios "user"
        //Puedo redirigir a una página que indique que no tiene los permisos necesarios
    }
    next();
};

module.exports = restrictToAdmin;