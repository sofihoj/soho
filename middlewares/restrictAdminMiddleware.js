const restrictToAdmin = (req, res, next) => {
    if (req.session.userLogged && req.session.userLogged.tipo_usuario_id === 1) {
        // Si el usuario tiene tipo_usuario_id igual a 1 (categoría "admin"), permite el acceso a "/administrar".
        return next();
    } else {
        // Si el usuario no es un administrador, redirige a la página de perfil del usuario.
        return res.redirect('/users/profile');
    }
};

module.exports = restrictToAdmin;