const app = require("../app");

/* GET productos. */
const controller = {
  
  retrive:
    function(req, res) {
      if (req.params.id == undefined) {
        /*window.open("","","left=150pt,top=150pt,width=400px,height=400px",false)*/
        res.render("productos");
      } else {
        res.render("producto");
      }
    }
}; 

module.exports = controller;