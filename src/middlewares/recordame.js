const rwdJson = require("../models/rwd-json.js");
const usersJson = "../../data/users.json";

function recordame (req, res, next) {
    let usuarios = rwdJson.readJSON(usersJson);
    if (usuarios) {
        let usuarioEncontrado = usuarios.find (user => user.usuario == req.cookies.recordame);
        if (usuarioEncontrado != undefined) {
            req.session.usuarioLogueado = usuarioEncontrado;
        }
    }
    next();
}
module.exports = recordame;