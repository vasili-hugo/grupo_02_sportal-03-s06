/* GET carrito. */
const controller = {
  
  retrive:
    function(req, res) {
      if (req.session.usuarioLogueado) {
        res.render("carrito");
      } else {
        res.send("Para acceder al carrito debe estar logueado.");
      }
    }
}; 

module.exports = controller;