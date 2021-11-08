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
      // Contadores
      let ids = [];
      let descs = [];
      let qtys = [];
      // Productos y categorias
      let products = {};
      products = db.Product.findAll(params)
      let headings = db.Heading.findAll({order: [["desc", "ASC"]]});
      Promise.all([products, headings])
      .then(function([products, headings]) {
        //Inicializo contadores
        headings.map(function (elem) {
          ids.push(elem.id);
          descs.push(elem.desc);
          qtys.push(0);
        });
        //Preparo armado del OL a devolver
        let result = {};
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
          // Cuenta productos por categoria
          let idx = ids.findIndex(function (item) {
            return (elem.heading_id == item);
          });
          if (idx > -1) {
            qtys[idx] = qtys[idx] + 1;
          }
        });
        // Arma array de productos por categoria
        let headingArray = [];
        for (let i = 0 ; i < ids.length ; i++) {
          let countByCats = {
            id: ids[i],
            desc: descs[i],
            count: qtys[i]
          }
          headingArray.push(countByCats);
        }
        // Completo el OL a devolver
        result.count = products.length;
        result.countByCategory = headingArray;
        result.products = productArray;
        result.status = 200;
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
}

module.exports = controller;