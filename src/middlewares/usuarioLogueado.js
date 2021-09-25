function usuarioLogueado (req, res, next) {
    res.locals.logueado = false;
    if (req.session && req.session.usuarioLogueado) {
        res.locals.logueado = true;
        res.locals.usuario = req.session.usuarioLogueado.usuario;
        res.locals.nombre = req.session.usuarioLogueado.nombre;
        res.locals.apellido = req.session.usuarioLogueado.apellido;
    }
    next();
}

module.exports = usuarioLogueado;