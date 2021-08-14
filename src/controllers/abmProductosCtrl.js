/* GET abm productos. */
const productos = [
  {
    codigo: "Nuevo",
    precio: 0
  },
  {
    codigo: "prod1",
    precio: 12
  },
  {
    codigo: "prod2",
    precio: 23
  },
  {
    codigo: "prod3",
    precio: 34
  },
  {
    codigo: "prod4",
    precio: 45
  }
];

const controller = {

  retriveAll:
    function(req, res) {
      res.render("abmProductos",{prodList: productos});
    },

  retrive:
    function(req, res) {
      res.send("Ha utilizado la ruta '/abmProductos/retrive' para el producto " + req.params.id)
    },
    
  insert:
    function(req, res) {
      res.send("Ha utilizado la ruta '/abmProductos/insert' para el producto " + req.params.id)
    },
  
  update:
    function(req, res) {
      res.send("Ha utilizado la ruta '/abmProductos/update' para el producto " + req.params.id)
   },
  
  delete:
    function(req, res) {
      res.send("Ha utilizado la ruta '/abmProductos/delete' para el producto " + req.params.id)
    }
}; 

module.exports = controller;