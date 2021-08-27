

/* GET users. */
const controller = {
  
  retrive: function(req, res) {
    res.render("register");
  },
  register: function (req, res) {
    res.render('index');
  }
}; 

module.exports = controller;