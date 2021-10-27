const db = require ('../database/models');

function recordame (req, res, next) {
    if(req.cookies.recordame) {
        db.User.findByPk(req.cookies.recordame)
        .then(usuario => {
            req.session.usuarioLogueado = usuario;
        })
        .catch(function(errmsg) {
            throw new Error('Error db.User.findByPk: ' + errmsg);
        });
    }
    next();
}
module.exports = recordame;