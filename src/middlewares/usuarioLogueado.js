function usuarioLogueado (req, res, next) {
    res.locals.logueado = false;
    if (req.session && req.session.usuarioLogueado) {
        res.locals.logueado = true;
    }
    next();
}

module.exports = usuarioLogueado;