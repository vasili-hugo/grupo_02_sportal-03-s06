// Usuarios

// In / Out File System
const rwdJson = require("../models/rwd-json.js");

//Requisitos de registracion
const {validationResult} = require('express-validator');
const config = require("../controllers/config.js");
const bcrypt = require('bcryptjs');
const {getToken, getTokenData} = require("../functions/jwt.js");
const {configSMTP, getTemplate} = require("../functions/mailer.js");
const uuid = require("uuid");

// JSON path
const usersJson = "../../data/users.json";

/* JSON Layout
usuario   : e-mail (X)
password  : Contraseña (X)
nombre    : Nombres (X)
apellido  : Apellidos (X)
dni       : DNI (N)
celular   : Celular (N)
direccion : Direccion (X)
cp        : Codigo Postal (X)
localidad : Localidad (X)
avatar    : Foto de perfil (X)
isAdmin   : true/false
active    : true/false
uuid      : uuid (formato especifico)
*/

// Controller
// Importante:
// funcion Store: Configurar los parametros del protocolo SMTP
//                Configurar los datos de la cuenta autorizada a enviar mails.
//                Configurar la ruta de confirmacion en la funcion 'getTemplate'.
//                Esto debe hacerse en la funcion /src/functions/mailer.js

const controller = {
  // Muestra formulario de Registro
  create: function (req, res) {
    delete req.session.avatar
    res.render("register", {misc: config.misc});
  }
  ,
  // Crea un nuevo usuario
  store: async function (req, res) {
    let validacionDeErrores = validationResult(req);
    let product = req.body;
    product.avatar = req.session.avatar;
    if (validacionDeErrores.errors.length > 0) {
      return res.render('register', {
        errors: validacionDeErrores.mapped(),
        misc: config.misc,
        oldData: product
      })
    } else {
      let newItem = {
        usuario: req.body.usuario,
        password: bcrypt.hashSync(req.body.password, 10),
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        dni: req.body.dni,
        celular: req.body.celular,
        direccion: req.body.direccion,
        cp: req.body.cp,
        localidad: req.body.localidad,
        avatar: req.file.filename,
        isAdmin: false,
        active: false,
      }
      let usuarios = rwdJson.readJSON(usersJson);
      if (!usuarios) {usuarios = []};
      // Codigo para generar un token version 4 RFC4122
      let uuidStr = uuid.v4();
      // Guardar el uuidStr y el estado del usuario para su posterior verificacion
      newItem.uuid = uuidStr;
      usuarios.push(newItem);
      // Obtiene token
      const email = newItem.usuario;
      const {nombre, apellido} = newItem;
      const token = getToken({email, uuidStr});
      // Envia mail para activar
      // Parametros del protocolo SMTP
      let transporter = configSMTP();
      // Procesa el envio
      let adminAccount = transporter.options.auth.user;
      let info = await transporter.sendMail({
        from: "'Sportal Admin' <" + adminAccount + ">",   // sender address
        to: email,                                        // list of receivers (separados por comas)
        subject: "Activación de Cuenta Personal",         // Subject line
        //text: "Esta es una prueba",                     // plain text body
        html: getTemplateNewUser(nombre, apellido, token) // HTML text body
      });
      if (info) {
        rwdJson.writeJSON(usersJson, usuarios);
        res.send("Se ha enviado un correo a " + email);
      } else {
        res.send("No se ha podido enviar un correo a " + email);
      }
    }
  }
  ,
  //edita el usuario activo
  edit: function (req, res) {
    let usuario = {};
    let usuarios = rwdJson.readJSON(usersJson);
    if (usuarios) {
      for (let i=0; i< usuarios.length; i++){
        if (usuarios[i].usuario == req.params.id){
          usuario = usuarios[i];
        }
      }
    }
    res.render("userProfile", {usuario});
  }
  ,
  // actualiza datos del usuario
  editStore: function (req, res) {
    let validacionDeErrores = validationResult(req);
    if (validacionDeErrores.errors.length > 0) {
      return res.render('userProfile', {
        errors: validacionDeErrores.mapped(),
        oldData: req.body,
        usuario: req.body
      })
    } else {
      let usuarios = rwdJson.readJSON(usersJson);
      if (usuarios) {
        for (let i=0; i< usuarios.length; i++){
          if (usuarios[i].usuario == req.params.id){
            usuarios[i].password = bcrypt.hashSync(req.body.password, 10);
            usuarios[i].nombre = req.body.nombre;
            usuarios[i].apellido = req.body.apellido;
            usuarios[i].dni = req.body.dni;
            usuarios[i].celular = req.body.celular;
            usuarios[i].direccion = req.body.direccion;
            usuarios[i].cp = req.body.cp;
            usuarios[i].localidad = req.body.localidad;
            usuarios[i].avatar = req.file.filename;
            usuarios[i].isAdmin = false;
            usuarios[i].active = true;
          }
        }
        rwdJson.writeJSON(usersJson, usuarios);
        res.redirect("/login");
      } else {
        res.send("No hay usuarios en la BD.");
      }
    }
  }
  ,
  confirm: async function (req, res) {
    const token = req.params.token;
    // Verificamos el token
    const dataToken = await getTokenData(token);
    if (dataToken) {
      const email = dataToken.data.email;
      const uuidStr = dataToken.data.uuidStr;
      let usuarios = rwdJson.readJSON(usersJson);
      if (usuarios) {
        // Comparamos los uuids.
        const usuario = usuarios.find(function (item) {
          return (item.usuario == email);
        });
        if (usuario) {
          if (usuario.active) {
            res.send("El usuario '" + email + "' ya está activo.");
          } else {
            if (uuidStr == usuario.uuid) {
              const updUsers = usuarios.map(function (item) {
                if (item.usuario == email) {
                  item.active = true;
                }
                return item;
              });
              rwdJson.writeJSON(usersJson, updUsers);
              res.redirect("/login");
            } else {
              res.send("Error de autenticación.");
            }
          }
        } else {
          res.send("El usuario '" + email + "' no existe.");
        }
      } else {
        res.send("No hay usuarios en la BD.");
      }
    } else {
      res.send("No se pudo verificar el token recibido del usuario.");
    }
  }
,
  newPass: async function (req, res) {
    const token = req.params.token;
    // Verificamos el token
    const dataToken = await getTokenData(token);
    if (dataToken) {
      const email = dataToken.data.email;
      const uuidStr = dataToken.data.uuidStr;
      let usuarios = rwdJson.readJSON(usersJson);
      if (usuarios) {
        // Comparamos los uuids.
        const usuario = usuarios.find(function (item) {
          return (item.usuario == email);
        });
        if (usuario) {
          if (usuario.active) {
            res.send("El usuario '" + email + "' ya está activo.");
          } else {
            if (uuidStr == usuario.uuid) {
              res.render("userProfile", {usuario, oldData: usuario});
            } else {
              res.send("Error de autenticación.");
            }
          }
        } else {
          res.send("El usuario '" + email + "' no existe.");
        }
      } else {
        res.send("El usuario '" + email + "' no existe.");
      }
    } else {
      res.send("No se pudo verificar el token recibido del usuario.");
    }
  }
}

module.exports = controller;