window.onload = function () {
  const validExt = ["jpeg", "jpg", "png", "gif"];
  let form = document.querySelector("form");
  let marca = document.querySelector("#marca");
  let errores = false;
  marca.focus();

  form.addEventListener("submit", function(e) {
    // marca
    let errmsg = document.querySelector(".errmsg-marca");
    if (marca.value.length > 0) {
      errmsg.innerHTML = "";
    } else {
      errmsg.innerHTML = "<p>Debe seleccionar un ítem de la lista desplegable.</p>";
      errores = true;
    }
    // rubro
    let rubro = document.querySelector("#rubro");
    errmsg = document.querySelector(".errmsg-rubro");
    if (rubro.value.length > 0) {
      errmsg.innerHTML = "";
    } else {
      errmsg.innerHTML = "<p>Debe seleccionar un ítem de la lista desplegable.</p>";
      errores = true;
    }
    // modelo
    let model = document.querySelector("#modelo");
    errmsg = document.querySelector(".errmsg-modelo");
    if (okString(model.value)) {
      errmsg.innerHTML = "";
    } else {
      errmsg.innerHTML = "<p>Campo obligatorio.</p>";
      errores = true;
    }
    // familia
    let familia = document.querySelector("#familia");
    errmsg = document.querySelector(".errmsg-familia");
    if (familia.value.length > 0) {
      errmsg.innerHTML = "";
    } else {
      errmsg.innerHTML = "<p>Debe seleccionar un ítem de la lista desplegable.</p>";
      errores = true;
    }
    // desc
    let desc = document.querySelector("#desc");
    errmsg = document.querySelector(".errmsg-desc");
    if (okString(desc.value)) {
      errmsg.innerHTML = "";
    } else {
      errmsg.innerHTML = "<p>Campo obligatorio.</p>";
      errores = true;
    }
    // precio
    let precio = document.querySelector("#precio");
    errmsg = document.querySelector(".errmsg-precio");
    if (precio.value.length > 0) {
      if (okNumeric(precio.value)) {
        precio.value = (precio.value * 100 / 100).toFixed(2);
        errmsg.innerHTML = "";
      } else {
        errmsg.innerHTML = "<p>Campo numérico mayor de cero.</p>";
        errores = true;
      }
    } else {
      errmsg.innerHTML = "<p>Campo obligatorio.</p>";
      errores = true;
    }
    // edad
    let edad = document.querySelector("#edad");
    errmsg = document.querySelector(".errmsg-edad");
    if (edad.value.length > 0) {
      errmsg.innerHTML = "";
    } else {
      errmsg.innerHTML = "<p>Debe seleccionar un ítem de la lista desplegable.</p>";
      errores = true;
    }
    // sexo
    let sexo = document.querySelector("#sexo");
    errmsg = document.querySelector(".errmsg-sexo");
    if (sexo.value.length > 0) {
      errmsg.innerHTML = "";
    } else {
      errmsg.innerHTML = "<p>Debe seleccionar un ítem de la lista desplegable.</p>";
      errores = true;
    }
    // color
    let color = document.querySelector("#color");
    errmsg = document.querySelector(".errmsg-color");
    if (color.value.length > 0) {
      errmsg.innerHTML = "";
    } else {
      errmsg.innerHTML = "<p>Debe seleccionar un ítem de la lista desplegable.</p>";
      errores = true;
    }
    // image
    let image = document.querySelector("#image");
    errmsg = document.querySelector(".errmsg-image");
    if (image.value.length > 0) {
      if (okImage(image.value, validExt)) {
        //req.session.image = image.value;
        errmsg.innerHTML = "";
      } else {
        errmsg.innerHTML = "<p>Las extensiones permitidas son '" + validExt.toString() + "'.</p>";
        errores = true;
      }
    } else {// if (!req.session.image) {
      errmsg.innerHTML = "<p>Campo obligatorio.</p>";
      errores = true;
    }
    // image1
    image = document.querySelector("#image1");
    errmsg = document.querySelector(".errmsg-image1");
    if (image.value.length > 0) {
      if (okImage(image.value, validExt)) {
        //req.session.leftImage = image.value;
        errmsg.innerHTML = "";
      } else {
        errmsg.innerHTML = "<p>Las extensiones permitidas son '" + validExt.toString() + "'.</p>";
        errores = true;
      }
    } else {
      errmsg.innerHTML = "";
    }
    // image2
    image = document.querySelector("#image2");
    errmsg = document.querySelector(".errmsg-image2");
    if (image.value.length > 0) {
      if (okImage(image.value, validExt)) {
        //req.session.rightImage = image.value;
        errmsg.innerHTML = "";
      } else {
        errmsg.innerHTML = "<p>Las extensiones permitidas son '" + validExt.toString() + "'.</p>";
        errores = true;
      }
    } else {
      errmsg.innerHTML = "";
    }
    // image3
    image = document.querySelector("#image3");
    errmsg = document.querySelector(".errmsg-image3");
    if (image.value.length > 0) {
      if (okImage(image.value, validExt)) {
        //req.session.uuperImage = image.value;
        errmsg.innerHTML = "";
      } else {
        errmsg.innerHTML = "<p>Las extensiones permitidas son '" + validExt.toString() + "'.</p>";
        errores = true;
      }
    } else {
      errmsg.innerHTML = "";
    }
    // image4
    image = document.querySelector("#image4");
    errmsg = document.querySelector(".errmsg-image4");
    if (image.value.length > 0) {
      if (okImage(image.value, validExt)) {
        //req.session.lowerImage = image.value;
        errmsg.innerHTML = "";
      } else {
        errmsg.innerHTML = "<p>Las extensiones permitidas son '" + validExt.toString() + "'.</p>";
        errores = true;
      }
    } else {
      errmsg.innerHTML = "";
    }
    // errores
    if (errores) {
      e.preventDefault();
    }
  });
}

function okString (valor) {
  for (let i = 0 ; i < valor.length ; i++) {
    if (valor[i] != " ") {
      return true;
    }
  }
  return false;
}

function okNumeric (valor) {
  valor = valor.okString();
  let numerics = [".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
  for (let i = 0 ; i < valor.length ; i++) {
    if (!numerics.includes(valor[i])) {
      return false;
    }
  }
  return true;
}

function okImage (valor, extentions) {
  let ext = "";
  for (let i = 0 ; i < valor.length ; i++) {
    let idx = valor.length - i - 1;
    if (valor[idx] == ".") {
      return (extentions.includes(ext));
    } else {
      ext = valor[idx].toLowerCase() + ext;
    }
  }
  return false;
}