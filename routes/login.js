var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if(req.session.email && req.session.password)
    //res.redirect("/");
    //redirigir a los tipos de usuario
  else res.render('login');

});

router.post('/', function(req, res, next) {
  console.log(req.session.userid);
  console.log(req.body.user);
  console.log(req.body.password);
  if(req.body.user && req.body.password){
    console.log("ok");

    var sql = "SELECT id_usuario FROM Usuario WHERE nombre=? AND pasw=?";
    var wheres = [req.body.user, req.body.password];
    var query = req.app.mysql.format(sql, wheres);

    req.app.mysql.query(query, function(err, rows, fields){
      if(rows.length == 1){
        res.append("user_id", rows[0].id);
        req.session.user_id = rows[0].id;
        //res.redirect("/");
        //redirigir a los tipos de usuario
      }else{
        res.status(406).render("login");
      }
    })

    req.session.user = req.body.user;
    req.session.password = req.body.password;

  }else{
    //res.send("Error: email or password not found");
    res.render("login");
  }
});

module.exports = router;
