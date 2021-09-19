/* Bitacora
18/09/2021 - Se agregan todos los datos del producto
*/

const Productos = require("../models/Productos.js");
const config = require("./config.js");

const controller = {
  // Muestra los datos de un producto
  retrive:
    function (req, res) {
      let producto = Productos.oneRecord(req);
      let misc = config.misc;
      let others = similars (req, 4);
      res.render("producto", {producto, misc, others});
    }
}; 

// Obtiene hasta un maximo de 'maxItems' productos para ser mostrados como similares.
// Si se tienen mas de 'maxItems', los productos se seleccionan aleatoriamente.
function similars (req, maxItems) {
  let others = [];
  let productos = Productos.allRecords();
  if (productos) {
    let producto = Productos.oneRecord(req);
    if (producto) {
      let family = producto.family;
      let newProducts = productos.filter (function (item) {
        return (item.family == family && item.id != req.params.id);
      });
      if (newProducts) {
        if (newProducts.length > 0) {
          if (newProducts.length > maxItems) {
            let idxs = [];
            let idx = 0;
            let i = 0;
            do {
              idx = (Math.random() * (newProducts.length - 1)).toFixed(0);
              if (!idxs.includes(idx)) {
                idxs.push(idx);
                others.push(newProducts[idx]);
                i++;
              }
            } while (i < maxItems);
          } else {
            others = newProducts;
          }
        }
      }
    }
  }
  return others;
}

module.exports = controller;