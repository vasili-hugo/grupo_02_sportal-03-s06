// Productos

/* Bitacora
17/09/2021 - Se reemplazo todo el codigo que contemplaba lectura y escritura del JSON por el modelo.
19/09/2021 - Este modulo incorpora los metodos del controlador productoCtrl.js, quedando este ultimo obsoleto.
19/10/2021 - Reemplazo de JSON por Sequelize.
*/

const db = require('../database/models');
const { Op } = require("sequelize");

// Validaciones
const {validationResult} = require("express-validator");

// Opciones del Select
const config = require("./config.js");

// Controller
const controller = {
  // Muestra los datos de un producto
  readOne:
    function (req, res) {
      db.Product.findByPk(req.params.id, {
        include: ["brands", "headings"]
      })
      .then(function(producto) {
        let misc = config.misc;
        misc.heading = producto.headings.desc;
        misc.model = producto.model;
        misc.desc = producto.desc;
        let family = producto.family_id;
        let maxItems = 4;
        let others = [];
        db.Product.findAll({
          where: {
            id: {[Op.ne]: req.params.id},
            family_id: family,
            inactive: false
          }
        })
        .then(function(newProducts) {
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
          res.render("producto", {producto, misc, others});
        })
        .catch(function(errmsg) {
          res.send(errmsg);       
        });
      })
      .catch(function(errmsg) {
        res.send(errmsg);
      });
    }
  ,
  // Efectua busqueda en vista de clientes
  search:
    function (req, res) {
      let misc = config.misc;
      misc.heading = "Búsqueda";
      db.Product.findAll({
        include: ["ages", "brands", "colors", "families", "headings", "sex"],
        where: {
          model: {[Op.like]: "%" + req.query.searchString + "%"},
          inactive: false
        }
      })
      .then(function(products) {
        if (!products) {products = []}
        res.render("productos", {products, misc});
      })
      .catch(function(errmsg) {
        res.send(errmsg);
      });
    }
  ,
  // Efectua busqueda en vista de edicion/creacion
  searching:
    function (req, res) {
      if (hasAdminRights) {
        let misc = config.misc;
        db.Product.findAll({
          include: ["ages", "brands", "colors", "families", "headings", "sex"],
          where: {model: {[Op.like]: "%" + req.query.searchString + "%"}}
        })
        .then(function(products) {
          if (!products) {products = []}
          res.render("listarProductos", {products, misc});
        }).catch(function(errmsg) {
          res.send(errmsg);
        });
      }
    }
  ,
  // Muestra todos los productos correspondientes a ese rubro
  readAll:
    function (req, res) {
      let products = [];
      let misc = config.misc;
      let heading = req.params.id;
      switch (heading) {
        case "listar":
          // Muestra todos los productos para el administrador
          if (hasAdminRights) {
            db.Product.findAll({
              include: ["ages", "brands", "colors", "families", "headings", "sex"],
              where: {inactive: false}
            })
            .then(function(products) {
              if (!products) {products = []}
              res.render("listarProductos", {products, misc});
            }).catch(function(errmsg) {
              res.send(errmsg);
            });
          }
          break;
        case "crear":
          // Muestra el formulario para crear un nuevo producto
          if (hasAdminRights) {
            let errors = [];
            let prodList = [];
            // Inicializo los valores por defecto de la session de productos
            if (req.session.edit) {delete req.session.edit};
            if (!req.session.create) {
              req.session.image = ""
              req.session.leftImage = "";
              req.session.rightImage = "";
              req.session.upperImage = "";
              req.session.lowerImage = "";
              req.session.create = "";
            }
            let headings = db.Heading.findAll({order: [["desc", "ASC"]]});
            let families = db.Family.findAll({order: [["desc", "ASC"]]});
            let brands = db.Brand.findAll({order: [["desc", "ASC"]]});
            let colors = db.Color.findAll({order: [["desc", "ASC"]]});
            let ages = db.Age.findAll({order: [["desc", "ASC"]]});
            let sex = db.Sex.findAll({order: [["desc", "ASC"]]});
            Promise.all([brands, colors, sex, ages, headings, families])
            .then(function([brands, colors, sex, ages, headings, families]){
              prodList = {...req.session};
              res.render("crearProducto", {brands, colors, sex, ages, headings, families, misc, prodList, errors});
            })
            .catch(function(errmsg) {
              res.send(errmsg);
            });
          }
          break;
        case "saldos":
          misc.heading = "Saldos";
          res.render("productos", {products, misc});
          break;
        case "ofertas":
          misc.heading = "Ofertas";
          res.render("productos", {products, misc});
          break;
        case "novedades":
          misc.heading = "Novedades";
          res.render("productos", {products, misc});
          break;
        default:
          //misc.heading = heading;
          db.Heading.findByPk(heading)
          .then(function(oneHeading) {
            misc.heading = oneHeading.desc;  
          })
          .catch(function(errmsg) {
            res.send(errmsg);
          });
          db.Product.findAll({
            include: ["ages", "brands", "colors", "families", "headings", "sex"],
            where: {heading_id: heading, inactive: false}
          })
          .then(function(products) {
            if (!products) {products = []}
            res.render("productos", {products, misc});
          }).catch(function(errmsg) {
            res.send(errmsg);
          });
      }
    }
  ,
  // Crea un nuevo producto
  abmInsert:
    function (req, res) {
      if (hasAdminRights) {
        // Resguarda los datos del input file porque no se pueden pasar por 'value'.
        // Si se ingreso algun archivo de images, este esta contenido en el objeto 'req.files', creado via 'multer'.
        // Como solo hay un archivo por input file, el req.files solo contiene un elemento en el array denominado segun el valor del atributo 'name'.
        if (req.files.image) {req.session.image = req.files.image[0].filename};
        if (req.files.leftImage) {req.session.leftImage = req.files.leftImage[0].filename};
        if (req.files.rightImage) {req.session.rightImage = req.files.rightImage[0].filename};
        if (req.files.upperImage) {req.session.upperImage = req.files.upperImage[0].filename};
        if (req.files.lowerImage) {req.session.lowerImage = req.files.lowerImage[0].filename};
        // Errores detectados por el middleware de validacion
        let errors = validationResult(req);
        let showErrors = false;
        if (errors.isEmpty()) {
          errors = {};
        } else {
          errors = errors.mapped();
          showErrors = true;
        }
        // Verifico que se hayan ingresado los campos de imagenes que son obligatorios
        if (!req.session.image) {
          errors["image"] = {msg: "Campo obligatorio"};
          showErrors = true;
        }
        // Muestro errores o grabo el producto
        if (showErrors) {
          let product = [];
          product.code = req.body.code;
          product.brand_id = req.body.brand;
          product.heading_id = req.body.heading;
          product.model = req.body.model;
          product.family_id = req.body.family;
          product.desc = req.body.desc;
          product.price = req.body.price;
          product.age_id = req.body.age;
          product.sex_id = req.body.sex;
          product.color_id = req.body.color;
          product.image = req.session.image;
          product.leftImage = req.session.leftImage;
          product.rightImage = req.session.rightImage;
          product.upperImage = req.session.upperImage;
          product.lowerImage = req.session.lowerImage;
          let brands = db.Brand.findAll({order: [["desc", "ASC"]]});
          let colors = db.Color.findAll({order: [["desc", "ASC"]]});
          let sex = db.Sex.findAll({order: [["desc", "ASC"]]});
          let ages = db.Age.findAll({order: [["desc", "ASC"]]});
          let headings = db.Heading.findAll({order: [["desc", "ASC"]]});
          let families = db.Family.findAll({order: [["desc", "ASC"]]});
          Promise.all([brands, colors, sex, ages, headings, families])
          .then(function([brands, colors, sex, ages, headings, families]){
            let misc = config.misc;
            res.render("crearProducto", {brands, colors, sex, ages, headings, families, misc, errors, prodList: product});
          })
          .catch(function(errmsg) {
            res.send(errmsg);
          });
        } else {
          db.Product.create({
            code: req.body.code,
            brand_id: req.body.brand,
            heading_id: req.body.heading,
            model: req.body.model,
            family_id: req.body.family,
            desc: req.body.desc,
            price: req.body.price,
            age_id: req.body.age,
            sex_id: req.body.sex,
            color_id: req.body.color,
            image: req.session.image,
            left_image: req.session.leftImage,
            right_image: req.session.rightImage,
            upper_image: req.session.upperImage,
            lower_image: req.session.lowerImage,
            inactive: false
          })
          .then(function() {
            delete req.session.create;
            res.redirect("/productos/listar");
          })
          .catch(function(errmsg) {
            res.send(errmsg);          
          });
        }
      }
    }
  ,
  // Muestra un producto para editarlo
  abmEdit:
    function (req, res) {
      if (hasAdminRights) {
        let errors = [];
        if (req.session.create) {delete req.session.create};
        let product = db.Product.findByPk(req.params.id);
        let brands = db.Brand.findAll({order: [["desc", "ASC"]]});
        let colors = db.Color.findAll({order: [["desc", "ASC"]]});
        let sex = db.Sex.findAll({order: [["desc", "ASC"]]});
        let ages = db.Age.findAll({order: [["desc", "ASC"]]});
        let headings = db.Heading.findAll({order: [["desc", "ASC"]]});
        let families = db.Family.findAll({order: [["desc", "ASC"]]});
        Promise.all([product, brands, colors, sex, ages, headings, families])
        .then(function([product, brands, colors, sex, ages, headings, families]){
          req.session.image = product.image;
          req.session.leftImage = product.left_image;
          req.session.rightImage = product.right_image;
          req.session.upperImage = product.upper_image;
          req.session.lowerImage = product.lower_image;
          req.session.edit = "";
          let misc = config.misc;
          res.render("editarProducto", {brands, colors, sex, ages, headings, families, misc, errors, prodList: product});
        })
        .catch(function(errmsg) {
          res.send(errmsg);
        });
      }
    }
  ,
  // Actualiza un producto
  abmUpdate:
    function (req, res) {
      if (hasAdminRights) {
        // Resguarda los datos del input file porque no se pueden pasar por 'value'.
        // Si se ingreso algun archivo de images, este esta contenido en el objeto 'req.files', creado via 'multer'.
        // Como solo hay un archivo por input file, el req.files solo contiene un elemento en el array denominado segun el valor del atributo 'name'.
        if (req.files.image) {req.session.image = req.files.image[0].filename};
        if (req.files.leftImage) {req.session.leftImage = req.files.leftImage[0].filename};
        if (req.files.rightImage) {req.session.rightImage = req.files.rightImage[0].filename};
        if (req.files.upperImage) {req.session.upperImage = req.files.upperImage[0].filename};
        if (req.files.lowerImage) {req.session.lowerImage = req.files.lowerImage[0].filename};
        // Errores detectados por el middleware de validacion
        let errors = validationResult(req);
        let showErrors = false;
        if (errors.isEmpty()) {
          errors = {};
        } else {
          errors = errors.mapped();
          showErrors = true;
        }
        // Verifico que se hayan ingresado los campos de imagenes que son obligatorios
        console.log("Image: ", req.session.image, req.files.image, )
        if (!req.session.image) {
          errors["image"] = {msg: "Campo obligatorio"};
          showErrors = true;
        }
        // Muestro errores o grabo el producto
        if (showErrors) {
          let product = db.Product.findByPk(req.params.id);
          let brands = db.Brand.findAll({order: [["desc", "ASC"]]});
          let colors = db.Color.findAll({order: [["desc", "ASC"]]});
          let sex = db.Sex.findAll({order: [["desc", "ASC"]]});
          let ages = db.Age.findAll({order: [["desc", "ASC"]]});
          let headings = db.Heading.findAll({order: [["desc", "ASC"]]});
          let families = db.Family.findAll({order: [["desc", "ASC"]]});
          Promise.all([product, brands, colors, sex, ages, headings, families])
          .then(function([product, brands, colors, sex, ages, headings, families]){
            product.brand_id = req.body.brand;
            product.heading_id = req.body.heading
            product.model = req.body.model;
            product.family_id = req.body.family;
            product.desc = req.body.desc;
            product.price = req.body.price;
            product.age_id = req.body.age;
            product.sex_id = req.body.sex;
            product.color_id = req.body.color;
            product.image = req.session.image;
            product.left_image = req.session.leftImage;
            product.right_image = req.session.rightImage;
            product.upper_image = req.session.upperImage;
            product.lower_image = req.session.lowerImage;
            product.inactive = (req.body.inactive == "checked");
            let misc = config.misc;
            res.render("editarProducto", {brands, colors, sex, ages, headings, families, misc, errors, prodList: product});
          })
          .catch(function(errmsg) {
            res.send(errmsg);
          });
        } else {
          db.Product.update({
            brand_id: req.body.brand,
            heading_id: req.body.heading,
            model: req.body.model,
            family_id: req.body.family,
            desc: req.body.desc,
            price: req.body.price,
            age_id: req.body.age,
            sex_id: req.body.sex,
            color_id: req.body.color,
            image: req.session.image,
            left_image: req.session.leftImage,
            right_image: req.session.rightImage,
            upper_image: req.session.upperImage,
            lower_image: req.session.lowerImage,
            inactive: (req.body.inactive == "checked")
          },
          {where: {id: req.params.id}})
          .then(function() {
            delete req.session.edit;
            res.redirect("/productos/listar");
          })
          .catch(function(errmsg) {
            res.send(errmsg);          
          });
        }
      }
    }
  ,
  // Elimina un producto
  abmDelete:
    function (req, res) {
      db.Product.destroy({where: {id: req.params.id}})
      .then(function() {
        res.redirect("/productos/listar");          
      })
      .catch(function(errmsg) {
        res.send(errmsg);        
      });
   }
};

// Obtiene hasta un maximo de 'maxItems' productos para ser mostrados como similares.
// Si se tienen mas de 'maxItems', los productos se seleccionan aleatoriamente.
function similars (req, family, maxItems) {
  let others = [];
  db.Product.findAll({
    where: {
      id: {[Op.ne]: req.params.id},
      family_id: family
    }
  })
  .then(function(newProducts) {
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
    return others;
  })
  .catch(function(errmsg) {
    res.send(errmsg);       
  });
}

function hasAdminRights () {
  if (req.session.usuarioLogueado) {
    if (req.session.usuarioLogueado.isAdmin) {
      return true;
    } else {
      res.send("Para utilizar esta opción debe tener permisos de administrador.");
    }
  } else {
    res.send("Para utilizar esta opción debe tener permisos de administrador.");
  }
}

module.exports = controller;