function authUsuario (req, res, next) {
    if (req.session.usuarioLogueado == undefined) {
        next();
    } else {
        res.redirect ('home');
    }
}
module.exports = authUsuario;