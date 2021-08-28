const fs = require("fs");
const path = require("path");

function findAll(){
  //leer el json
  let productosJson= fs.readFileSync(path.join(__dirname, "../data/products.json"))

  //parsear la inform
  let data = JSON.parse(productosJson)
  return data
}

function writeJson(array){
  //transformamos en un string
  let arrayJson = JSON.stringify(array);
  
  //procesamos la inform en el Json
  return fs.writeFileSync(path.join(__dirname, "../data/products.json"), arrayJson);

}

/* GET abm productos. */
/* const productos = [
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
]; */

const controller = {

  retriveAll:
    function(req, res) {
      let prodList = findAll();
      res.render("abmProductos",{prodList});
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