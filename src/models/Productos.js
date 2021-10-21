// Productos

/* Bitacora
17/09/2021 - Se creo el modelo para desligar al controlador de esa tarea.
           - Se agrego el campo 'family'.
*/
const path = require('path');



// In / Out File System
const db = require("../database/models/");
const sequelize = db.sequelize;
const { Op } = require("sequelize");


const rwdJson = require("./rwd-json.js");

// JSON path
const productsJson = "../../data/products.json";

// path carpeta Productos
const pathProductos = "../../public/images/products/";

/* JSON Layout
id          : Codigo de producto (X)
brand       : Marca (tabla)
heading     : Rubro (tabla)
model       : Modelo (X)
family      : Familia de producto (X)
descripcion : Descripcion (X)
price       : Precio (N.DD)
age         : Edad (tabla)
sex         : Sexo (tabla)
color       : Color (tabla)
icon        : Icono de marca (.jpg)
image       : Imagen principal (.jpg)
leftImage   : Imagen izquierda (.jpg)
rightImage  : Imagen derecha (.jpg)
upperImage  : Imagen superior (.jpg)
lowerImage  : Imagen inferior (.jpg)
*/

const Productos = {
  errMsg: "",

  allRecords:
    // function () {
    //   let products = rwdJson.readJSON(productsJson);
    //   if (!products) {products = []}
    //   return products;
    // }
    function(){
      db.Product.findAll({
        include: ["ages", "brands", "colors", "families", "headings", "sex"]
      })
      .then(function (products) {
        if (!products) {
          products = []
        }
        return products;
      }).catch(function (errmsg) {
        resizeBy.send("Error en [db.Products.findAll]:" + errmsg);
      })
    },
  oneRecord: function (req) {
    let errors = false;
    let products = rwdJson.readJSON(productsJson);
    if (products) {
      let product = products.find(function (item) {
        return (item.id == req.params.id);
      });
      if (!product) {
        product = {}
      };
      return product;
    } else {
      products = {};
      return products;
    }
  },
  headingRecords: function (heading) {
    let products = this.allRecords();
    let newProducts = products.filter(function (item) {
      return (item.heading == heading);
    });
    return newProducts;
  },
  readRecord: function (req) {
    let errors = false;
    let products = rwdJson.readJSON(productsJson);
    if (products) {
      let product = products.find(function (item) {
        return (item.id == req.params.id);
      });
      if (product) {
        // Inicializo los valores por defecto de la session de productos
        if (!req.session.edit) {
          req.session.icon = product.icon
          req.session.image = product.image
          req.session.leftImage = product.leftImage;
          req.session.rightImage = product.rightImage;
          req.session.upperImage = product.upperImage;
          req.session.lowerImage = product.lowerImage;
          req.session.edit = "";
        }
        // Si no produjeron errores devuelve un array. [0] = errors ; [1] = product.
        return [errors, product];
      } else {
        this.errMsg = "El producto código " + req.params.id + " no existe";
        errors = true;
      }
    } else {
      this.errMsg = "El JSON de productos no existe";
      errors = true;
    }
    return [errors];
  },
  insertRecord: function (req) {
    let errors = false;
    let exists = false;
    let products = rwdJson.readJSON(productsJson);
    if (products) {
      exists = products.some(function (item) {
        return (item.id == req.body.id);
      });
    } else {
      products = [];
    }
    if (exists) {
      this.errMsg = "El producto código " + req.body.id + " existe";
      errors = true;
    } else {
      let newItem = {
        id: req.body.id,
        brand: req.body.brand,
        heading: req.body.heading,
        model: req.body.model,
        family: req.body.family,
        desc: req.body.desc,
        price: req.body.price,
        age: req.body.age,
        sex: req.body.sex,
        color: req.body.color,
        icon: req.session.icon,
        image: req.session.image,
        leftImage: req.session.leftImage,
        rightImage: req.session.rightImage,
        upperImage: req.session.upperImage,
        lowerImage: req.session.lowerImage
      }
      products.push(newItem);
      rwdJson.writeJSON(productsJson, products);
    }
    return errors;
  },
  updateRecord: function (req) {
    let errors = false;
    let products = rwdJson.readJSON(productsJson);
    if (products) {
      products = products.map(function (item) {
        if (item.id == req.params.id) {
          item.brand = req.body.brand;
          item.heading = req.body.heading;
          item.model = req.body.model;
          item.family = req.body.family;
          item.desc = req.body.desc;
          item.price = req.body.price;
          item.age = req.body.age;
          item.sex = req.body.sex;
          item.color = req.body.color;
          item.icon = req.session.icon;
          item.image = req.session.image;
          item.leftImage = req.session.leftImage;
          item.rightImage = req.session.rightImage;
          item.upperImage = req.session.upperImage;
          item.lowerImage = req.session.lowerImage;
        }
        return item;
      });
      rwdJson.writeJSON(productsJson, products);
    } else {
      this.errMsg = "El JSON de productos no existe";
      errors = true;
    }
    return errors;
  },
  deleteRecord: function (req) {
    let errors = false;
    let products = rwdJson.readJSON(productsJson);
    if (products) {
      let newProducts = products.filter(function (item) {
        if (item.id == req.params.id) {
          // Borra las imagenes del producto a borrar excepto la del avatar de marca.
          if (item.image) {
            rwdJson.deleteJSON(pathProductos + item.image)
          };
          if (item.leftImage) {
            rwdJson.deleteJSON(pathProductos + item.leftImage)
          };
          if (item.rightImage) {
            rwdJson.deleteJSON(pathProductos + item.rightImage)
          };
          if (item.upperImage) {
            rwdJson.deleteJSON(pathProductos + item.upperImage)
          };
          if (item.lowerImage) {
            rwdJson.deleteJSON(pathProductos + item.lowerImage)
          };
          return false;
        } else {
          return true;
        }
      });
      // Si el archivo queda vacio se borra sino se graba.
      if (newProducts.length > 0) {
        rwdJson.writeJSON(productsJson, newProducts);
      } else {
        rwdJson.deleteJSON(productsJson);
      }
    } else {
      this.errMsg = "El JSON de productos no existe";
      errors = true;
    }
    return errors
  }
};

module.exports = Productos;