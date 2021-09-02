// Productos

// In / Out File System
const rwdJson = require("./rwd-json.js");

// JSON path
const productsJson = "../../data/products.json";

/* JSON Layout
id          : Codigo de producto (X)
brand       : Marca (tabla)
heading     : Rubro (tabla)
model       : Modelo (X)
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

// Opciones del Select
const brands = {
  adidas: "Adidas",
  asics: "Asics",
  fila: "Fila",
  lotto: "Lotto",
  mizuno: "Mizuno",
  newBalance: "New Balance",
  nike: "Nike",
  puma: "Puma",
  reebok: "Reebok",
  topper: "Topper",
  underArmour: "Under Armour"
};

const colors = {
  amarillo: "Amarillo",
  azul: "Azul",
  blanco: "Blanco",
  gris: "Gris",
  marron: "Marrón",
  negro: "Negro",
  rojo: "Rojo",
  verde: "Verde"
};

const sex = {
  femenino: "Femenino",
  masculino: "Masculino",
  unisex: "Unisex"
};

const ages = {
  adultos: "Adultos",
  ninos: "Niños"
};

const headings = {
  agua: "Agua",
  basicos: "Básicos",
  calzado: "Calzado",
  carga: "Carga",
  electro: "Electro",
  equipo: "Equipo",
  portatiles: "Portátiles",
  tech: "Tech"
};

const misc = {
  imageExt: ".jpg, .png, .bmp",
  pathLogos: "/images/logos/",
  pathImages: "/images/sport/"
};

// Controller
const controller = {
  // Muestra todos los productos para los clientes
  retrive:
    function(req, res) {
      res.render("productos");
    }
  ,
  // Muestra todos los productos para administrarlos
  abmList:
    function (req, res) {
      products = rwdJson.readJSON(productsJson);
      if (products == undefined) {
        products = [];
      }
      res.render("listarProductos", {products});
    }
  ,
  // Muestra el formulario para crear un nuevo producto
  abmCreate:
    function (req, res) {
      res.render("crearProducto", {brands, colors, sex, ages, headings, misc});
    }
  ,
  // Crea un nuevo producto
  abmInsert:
    function (req, res) {
      let exists = false;
      let product = [];
      let products = rwdJson.readJSON(productsJson);
      if (products) {
        exists = products.some( function (item) {
          return (item.id == req.body.id);
        });
      } else {
        products = [];
      }
      if (exists) {
        res.send("El producto código " + req.body.id + " existe");
      } else {
        let newItem = {
          id: req.body.id,
          brand: req.body.brand,
          heading: req.body.heading,
          model: req.body.model,
          desc: req.body.desc,
          price: req.body.price,
          age: req.body.age,
          sex: req.body.sex,
          color: req.body.color,
          icon: req.body.icon,
          image: req.body.image,
          leftImage: req.body.leftImage,
          rightImage: req.body.rightImage,
          upperImage: req.body.upperImage,
          lowerImage: req.body.lowerImage
        }
        products.push(newItem);
        rwdJson.writeJSON(productsJson, products, false);
        res.redirect("/productos/listar");
      }
    }
  ,
  // Muestra un producto para editarlo
  abmEdit:
    function (req, res) {
      let product = [];
      let products = rwdJson.readJSON(productsJson);
      if (products) {
        product = products.find( function (item) {
          return (item.id == req.params.id);
        });
        if (product) {
          product.icon = (product.icon == "" ? "NoImagen.jpg" : product.icon);
          product.image = (product.image == "" ? "NoImagen.jpg" : product.image);
          product.leftImage = (product.leftImage == "" ? "NoImagen.jpg" : product.leftImage);
          product.rightImage = (product.rightImage == "" ? "NoImagen.jpg" : product.rightImage);
          product.upperImage = (product.upperImage == "" ? "NoImagen.jpg" : product.upperImage);
          product.lowerImage = (product.lowerImage == "" ? "NoImagen.jpg" : product.lowerImage);
          res.render("editarProducto",{prodList: product, brands, colors, sex, ages, headings, misc});
        } else {
          res.send("El producto código " + req.params.id + " no existe");
        }
      } else {
        res.send("El JSON de productos no existe");
      }
    }
  ,
  // Actualiza un producto
  abmUpdate:
    function (req, res) {
      let product = [];
      let products = rwdJson.readJSON(productsJson);
      if (products) {
        products = products.map( function (item) {
          if (item.id == req.params.id) {
            item.brand = req.body.brand;
            item.heading = req.body.heading;
            item.model = req.body.model;
            item.desc = req.body.desc;
            item.price = req.body.price;
            item.age = req.body.age;
            item.sex = req.body.sex;
            item.color = req.body.color;
            item.icon = (req.body.icon == "" ? item.icon : req.body.icon);
            item.image = (req.body.image == "" ? item.image : req.body.image);
            item.leftImage = (req.body.leftImage == "" ? item.leftImage : req.body.leftImage);
            item.rightImage = (req.body.rightImage == "" ? item.rightImage : req.body.rightImage);
            item.upperImage = (req.body.upperImage == "" ? item.upperImage : req.body.upperImage);
            item.lowerImage = (req.body.lowerImage == "" ? item.lowerImage : req.body.lowerImage);
          }
          return item;
        });
        rwdJson.writeJSON(productsJson, products, false);
        res.redirect("/productos/listar");
      } else {
        res.send("El JSON de productos no existe");
      }
    }
  ,
  // Elimina un producto
  abmDelete:
    function (req, res) {
      let product = [];
      let products = rwdJson.readJSON(productsJson);
      if (products) {
        let newProducts = products.filter( function (item) {
          return (item.id != req.params.id);
        });
        if (newProducts.length > 0) {
          rwdJson.writeJSON(productsJson, newProducts, false);
        } else {
          rwdJson.deleteJSON(productsJson);
        }
        res.redirect("/productos/listar");
      } else {
        res.send("El JSON de productos no existe");
      }
    }
}; 

module.exports = controller;