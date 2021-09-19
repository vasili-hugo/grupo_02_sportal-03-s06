// Productos

/* Bitacora
17/09/2021 - Se reemplazo todo el codigo que contemplaba lectura y escritura del JSON por el modelo.
*/

// Funcionalidades del Modelo
const Productos = require("../models/Productos.js")

// Validaciones
const {validationResult} = require("express-validator");

// Opciones del Select
const config = require("./config.js");

// Controller
const controller = {
  // Muestra todos los productos correspondientes a ese rubro
  retrive:
    function (req, res) {
      let products = [];
      let misc = config.misc;
      let heading = req.params.id;
      switch (heading) {
        case "listar":
          // Muestra todos los productos para el administrador
          products = Productos.allRecords();
          res.render("listarProductos", {products, misc});
          break;
        case "crear":
          // Muestra el formulario para crear un nuevo producto
          let errors = [];
          let prodList = [];
          // Inicializo los valores por defecto de la session de productos
          if (req.session.edit) {delete req.session.edit};
          if (!req.session.create) {
            req.session.icon = ""
            req.session.image = ""
            req.session.leftImage = "";
            req.session.rightImage = "";
            req.session.upperImage = "";
            req.session.lowerImage = "";
            req.session.create = "";
          }
          let brands = config.brands;
          let colors = config.colors;
          let sex = config.sex;
          let ages = config.ages;
          let headings = config.headings;
          prodList = {...req.session};
          res.render("crearProducto", {brands, colors, sex, ages, headings, misc, prodList, errors});
          break;
        case "saldos":
        case "ofertas":
        case "novedades":
          res.render("listarProductos", {products, misc});
          break;
        default:
          products = Productos.headingRecords(heading);
          res.render("productos", {products, misc});
      }
    }
  ,
  // Crea un nuevo producto
  abmInsert:
    function (req, res) {
      // Resguarda los datos del input file porque no se pueden pasar por 'value'.
      // Si se ingreso algun archivo de images, este esta contenido en el objeto 'req.files', creado por via 'multer'.
      // Como solo hay un archivo por input file, el req.files solo contiene un elemento en el array denominado segun el valor del atributo 'name'.
      if (req.files.icon) {req.session.icon = req.files.icon[0].filename};
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
      if (!req.session.icon) {
        errors["icon"] = {msg: "Campo obligatorio"};
        showErrors = true;
      }
      if (!req.session.image) {
        errors["image"] = {msg: "Campo obligatorio"};
        showErrors = true;
      }
      // Muestro errores o grabo el producto
      if (showErrors) {
        let product = req.body;
        product.icon = req.session.icon;
        product.image = req.session.image;
        product.leftImage = req.session.leftImage;
        product.rightImage = req.session.rightImage;
        product.upperImage = req.session.upperImage;
        product.lowerImage = req.session.lowerImage;
        let brands = config.brands;
        let colors = config.colors;
        let sex = config.sex;
        let ages = config.ages;
        let headings = config.headings;
        let misc = config.misc;
        res.render("crearProducto", {brands, colors, sex, ages, headings, misc, errors, prodList: product});
      } else {
        if (Productos.insertRecord(req)) {
          res.send(Productos.errMsg);
        } else {
          delete req.session.create;
          res.redirect("/productos/listar");
        }
      }
    }
  ,
  // Muestra un producto para editarlo
  abmEdit:
    function (req, res) {
      let errors = [];
      if (req.session.create) {delete req.session.create};
      let [status, product] = Productos.readRecord(req)
      if (status) {
        res.send(Productos.errMsg);
      } else {
        let brands = config.brands;
        let colors = config.colors;
        let sex = config.sex;
        let ages = config.ages;
        let headings = config.headings;
        let misc = config.misc;
        res.render("editarProducto",{brands, colors, sex, ages, headings, misc, errors, prodList: product});
      }
    }
  ,
  // Actualiza un producto
  abmUpdate:
    function (req, res) {
      // Resguarda los datos del input file porque no se pueden pasar por 'value'.
      // Si se ingreso algun archivo de images, este esta contenido en el objeto 'req.files', creado por via 'multer'.
      // Como solo hay un archivo por input file, el req.files solo contiene un elemento en el array denominado segun el valor del atributo 'name'.
      if (req.files.icon) {req.session.icon = req.files.icon[0].filename};
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
      if (!req.session.icon) {
        errors["icon"] = {msg: "Campo obligatorio"};
        showErrors = true;
      }
      if (!req.session.image) {
        errors["image"] = {msg: "Campo obligatorio"};
        showErrors = true;
      }
      // Muestro errores o grabo el producto
      if (showErrors) {
        let product = req.body;
        product.id = req.params.id;
        product.icon = req.session.icon;
        product.image = req.session.image;
        product.leftImage = req.session.leftImage;
        product.rightImage = req.session.rightImage;
        product.upperImage = req.session.upperImage;
        product.lowerImage = req.session.lowerImage;
        let brands = config.brands;
        let colors = config.colors;
        let sex = config.sex;
        let ages = config.ages;
        let headings = config.headings;
        let misc = config.misc;
        res.render("editarProducto",{brands, colors, sex, ages, headings, misc, errors, prodList: product});
      } else {
        if (Productos.updateRecord(req)) {
          res.send(Productos.errMsg);
        } else {
          delete req.session.edit;
          res.redirect("/productos/listar");
        }
      }
    }
  ,
  // Elimina un producto
  abmDelete:
    function (req, res) {
      if (Productos.deleteRecord(req)) {
        res.send(Productos.errMsg);
      } else {
        res.redirect("/productos/listar");       
      }
   }
}; 

module.exports = controller;