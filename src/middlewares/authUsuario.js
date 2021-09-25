const userFunctions = {
    authUsuario: function (req, res, next) {
        if (req.session.usuarioLogueado == undefined) {
            next();
        } else {
            res.redirect('home', );
        }
    },
    //Verifica que el request sea del usuario logeado
    testUsuario: function (req, res, next) {
        if (req.params.id == req.session.usuarioLogueado.usuario) {
            next();
        } else {
            res.redirect('/home', );

        }

    }
}

module.exports = userFunctions;