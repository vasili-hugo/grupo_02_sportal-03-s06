// Opciones del Select

const config = {
  brands: {
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
  }
  ,
  colors: {
    amarillo: "Amarillo",
    azul: "Azul",
    blanco: "Blanco",
    gris: "Gris",
    marron: "Marrón",
    negro: "Negro",
    rojo: "Rojo",
    verde: "Verde"
  }
  ,
  sex: {
    femenino: "Femenino",
    masculino: "Masculino",
    unisex: "Unisex"
  }
  ,
  ages: {
    adultos: "Adultos",
    ninos: "Niños"
  }
  ,
  headings: {
    agua: "Agua",
    basicos: "Básicos",
    calzado: "Calzado",
    carga: "Carga",
    electro: "Electro",
    equipo: "Equipo",
    portatiles: "Portátiles",
    tech: "Tech"
  }
  ,
  // Valores varios
  misc: {
    imageExt: ".jpeg,.jpg,.png,.bmp", // No dejar espacio entre extensiones
    pathImages: "/images/products/",
    pathAvatar: "/images/avatars/",
    defaultImage: "default.jpg"
  }
}

module.exports = config;