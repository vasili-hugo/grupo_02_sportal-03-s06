// Productos

// In / Out File System
const db = require('../../database/models');

// Config
const config = require("../../controllers/config.js");

// Controller
const controller = {
  // Devuelve todos los productos
  allProducts:
    // Uso: /api/products/?rpp=<number>&page=<number>
    function (req, res) {
      // Paginacion
      let rpp = (req.query.rpp ? req.query.rpp : 0);
      let page = (req.query.page ? req.query.page : 1);
      let params = {};
      if (rpp > 0) {
        params = {
          limit: Number(rpp),
          offset: Number(rpp * (page - 1))
        }
      }
      // Productos y categorias
      db.Product.findAll(params)
      .then(function(products) {
        // Preparo array a devolver
        let productArray = [];
        products.map(function (elem) {
          // Arma el OL del producto
          let product = {
            id: elem.id,
            name: elem.model,
            description: elem.desc,
            detail: config.misc.urlSite + "/api/products/" + elem.id
          }
          productArray.push(product);
        });
        // Completo el OL a devolver
        let result = {
          count: products.length,
          products: productArray,
          status: 200
        }
        res.status(200).json(result);
      })
      .catch(function(errMsg) {
        res.json(errMsg);
      });
    }
  ,
  // Devuelve un usuario
  oneProduct:
    // Uso: /api/products/<id>
    function (req, res) {
      // Seleccion de todas las tablas involucradas.
      let product = db.Product.findByPk(req.params.id);
      let brands = db.Brand.findAll({order: [["desc", "ASC"]]});
      let colors = db.Color.findAll({order: [["desc", "ASC"]]});
      let sex = db.Sex.findAll({order: [["desc", "ASC"]]});
      let ages = db.Age.findAll({order: [["desc", "ASC"]]});
      let headings = db.Heading.findAll({order: [["desc", "ASC"]]});
      let families = db.Family.findAll({order: [["desc", "ASC"]]});
      Promise.all([product, brands, colors, sex, ages, headings, families])
      .then(function([product, brands, colors, sex, ages, headings, families]){
        // Creacion de OL de las tablas involucradas con informacion minima
        brands = brands.map(function (elem) {
          let newElem = {
            id: elem.id,
            desc: elem.desc,
            icon: config.misc.urlSite + config.misc.pathLogos + elem.icon
          }
          return newElem;
        });
        colors = colors.map(function (elem) {
          let newElem = {
            id: elem.id,
            desc: elem.desc,
          }
          return newElem;
        });
        sex = sex.map(function (elem) {
          let newElem = {
            id: elem.id,
            desc: elem.desc,
          }
          return newElem;
        });
        ages = ages.map(function (elem) {
          let newElem = {
            id: elem.id,
            desc: elem.desc,
          }
          return newElem;
        });
        headings = headings.map(function (elem) {
          let newElem = {
            id: elem.id,
            desc: elem.desc,
          }
          return newElem;
        });
        families = families.map(function (elem) {
          let newElem = {
            id: elem.id,
            desc: elem.desc,
          }
          return newElem;
        });
        let record = {
          id: product.id,
          code: product.code,
          brand: product.brand_id,
          heading: product.heading_id,
          model: product.model,
          family: product.family_id,
          desc: product.desc,
          price: product.price,
          age: product.age_id,
          sex: product.sex_id,
          color: product.color_id,
          image: config.misc.urlSite + config.misc.pathImages + product.image,
          imageLeft: (product.image_left ? config.misc.urlSite + config.misc.pathImages + product.image_left : ""),
          imageRight: (product.image_right ? config.misc.urlSite + config.misc.pathImages + product.image_right : ""),
          imageUpper: (product.image_upper ? config.misc.urlSite + config.misc.pathImages + product.image_upper : ""),
          imageLower: (product.image_lower? config.misc.urlSite + config.misc.pathImages + product.image_lower : ""),
          discontinued: product.inactive,
          // Colecciones
          brandsCollection: brands,
          colorsCollection: colors,
          sexCollection: sex,
          agesCollection: ages,
          headingsCollection: headings,
          familiesCollection: families
        }
        res.json(record);
      })
      .catch(function (errMsg) {
        res.json(errMsg);
      });
    }
  ,
    // Devuelve un array con la cantidad de productos por categoria
    totalByCategory:
    // Uso: /api/products/total
    function (req, res) {
      // Productos y categorias
      let products = db.Product.findAll();
      let headings = db.Heading.findAll({order: [["desc", "ASC"]]});
      Promise.all([products, headings])
      .then(function([products, headings]) {
        // Inicializo contadores
        let headingArray = [];
        let olCount = {};
        headings.map(function (elem) {
          olCount = {
            id: elem.id,
            desc: elem.desc,
            count: 0
          }
          headingArray.push(olCount);
        });
        // Cuenta productos por categoria
        products.map(function (elem) {
          let idx = headingArray.findIndex(function (item) {
            return (elem.heading_id == item.id);
          });
          if (idx > -1) {
            headingArray[idx].count++
          }
        });
        // Completo el OL a devolver
        let result = {
          count: products.length,
          countByCategory: headingArray,
          status: 200
        }
        res.status(200).json(result);
      })
      .catch(function(errMsg) {
        res.json(errMsg);
      });
    }

}

module.exports = controller;