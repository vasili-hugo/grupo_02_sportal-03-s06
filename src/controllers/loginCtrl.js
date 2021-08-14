/* GET users login. */
const controller = {

  retrive:
    function(req, res) {
      res.render("login");
    },
  
  forgotUser:
    function(req, res) {
      res.render("register");
    },
  
  forgotPass:
    function(req, res) {
      res.render("register");
    },
}; 

module.exports = controller;