/* Bitacora
17/09/2021 - Se controla que el nombre del archivo en 'icon' no cambie de nombre porque puede ser reutilizado.
           - Se controla que el resto de los archivos, de haber sido informados previamente, no cambien de nombre.
           - Verifica que cada archivo reciba un valor diferentes de Date.now().
20/10/2021 - Se elimino el item icon.
*/

var multer = require("multer");
var path = require("path");

let storage = multer.diskStorage ({
  destination:
    function (req, file, callback) {
      callback (null, path.join(__dirname, "../../public/images/products"));
    }
  ,
  filename:
    function (req, file, callback) {
      if (req.session.image == file.originalname) {
        callback (null, file.originalname);
      } else {
        let ahora = Date.now();
        do {} while (Date.now() <= ahora);
        callback (null, Date.now() + path.extname(file.originalname));
      }
    }
});

var upload = multer ({storage});
var uploadMany = upload.fields ([
  {name: "image", maxCount: 1},
  {name: "leftImage", maxCount: 1},
  {name: "rightImage", maxCount: 1},
  {name: "upperImage", maxCount: 1},
  {name: "lowerImage", maxCount: 1}
]);

module.exports = uploadMany;