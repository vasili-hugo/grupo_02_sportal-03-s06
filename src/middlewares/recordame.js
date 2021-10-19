//const rwdJson = require("../models/rwd-json.js");
//const usersJson = "../../data/users.json";
const db = require ('../database/models');

function recordame (req, res, next) {
    if(req.cookies.recordame) {
        db.Users.findByPk(req.cookies.recordame)
            .then(usuario => {
                req.session.usuarioLogueado = usuario;
            });
    }
    next();
}
module.exports = recordame;