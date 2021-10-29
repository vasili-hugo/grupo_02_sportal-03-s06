const nodemailer = require("nodemailer");
const config = require("../controllers/config.js")


async function correo(email, nombre, apellido, token) {
  // Parametros del protocolo SMTP
 let transporter = configSMTP();
 // Procesa el envio
 let adminAccount = transporter.options.auth.user;
 let info = await transporter.sendMail({
   from: "'Sportal Admin' <" + adminAccount + ">",   // sender address
   to: email,                                        // list of receivers (separados por comas)
   subject: "Activación de Cuenta Personal",         // Subject line
   //text: "Esta es una prueba",                     // plain text body
   html: getTemplateNewPass(nombre, apellido, token) // HTML text body
 });
 return info;
}

// create reusable transporter object using the default SMTP transport
function configSMTP () {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "sportal.ecom@gmail.com", // generated gmail user
        pass: "mcxhuzfuyrgdmtbe"        // generated gmail password
    },
    tls: {
        secure: false,
        ignoreTLS: true,
        rejectUnauthorized: false
    }
  });
  return transporter;
}

function getTemplateNewUser (nombre, apellido, token) {
  let expires = new Date();
  expires.setSeconds(43200); // 12 horas
  let url = config.misc.urlSite;
  return `
      <head>
          <link rel="stylesheet" href="./style.css">
          <title>Sportal - Confirmar Creación de Cuenta</title>
      </head>
      <body>
          <p>Hola ${nombre + " " + apellido}, recibes este correo porque has solicitado una cuenta en nuestro sitio.</p>
          <p>Si te ha llegado este correo por error, descártalo y te pedimos disculpas por el inconveniente.</p>
          <p>Presiona sobre el link o cópialo y pégalo en la barra de direcciones para enviarlo.</p>
          <p>Este link vence el ${expires}</p>
          <a href="http://${url}/users/confirm/${token}">Confirmar cuenta</a>
      </body>
  `;
}

function getTemplateNewPass (nombre, apellido, token) {
  let expires = new Date();
  expires.setSeconds(43200); // 12 horas
  let url = config.misc.urlSite;
  return `
      <head>
          <link rel="stylesheet" href="./style.css">
          <title>Sportal - Confirmar Cambio de Contraseña</title>
      </head>
      <body>
          <p>Hola ${nombre + " " + apellido}, recibes este correo porque has solicitado un blanqueo de contraseña.</p>
          <p>Si te ha llegado este correo por error, descártalo y te pedimos disculpas por el inconveniente.</p>
          <p>Presiona sobre el link o cópialo y pégalo en la barra de direcciones para enviarlo.</p>
          <p>Este link vence el ${expires}</p>
          <a href="http://${url}/users/newPass/${token}">Confirmar blanqueo</a>
      </body>
  `;
}

module.exports = {correo, configSMTP, getTemplateNewUser, getTemplateNewPass};