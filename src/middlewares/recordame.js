const rwdJson = require("../controllers/rwd-json");
const usersJson = "../../data/users.json";

function recordame (req, res, next) {
    let usuarios = rwdJson.readJSON(usersJson);
    let usuarioEncontrado = usuarios.find (user => user.usuario == req.cookies.recordame)
    if (usuarioEncontrado != undefined) {
        req.session.usuarioLogueado = usuarioEncontrado
    }
    next();
}
module.exports = recordame;