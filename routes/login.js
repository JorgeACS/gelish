const loginDB = require('../entity/loginDB');

class Sesion {

  constructor() {
    return (req, res, next) => {
      if(req.method == 'POST' && req.path == '/login')
        return Sesion.login(req, res);
      if(req.method == 'DELETE' && req.path == '/logout')
        return Sesion.logout(req, res);
      if(req.session.user || req.path == '/view/login') return next();
      if(req.path == '/') return res.render('login');
      return res.sendStatus(401);
    }
  }

  static login(req, res){
    if(req.session.user) return res.sendStatus(412); //precondition failed
    loginDB.get(req.mysql, req.body.username,req.body.password, (value) => {
      if(!value) return res.sendStatus(503) //service unavaliable
      if(value.length == 1){
        req.session.user = {
          id : v[0].id,
          tipo : v[0].id,
          nombre : v[0].nombre,
          apellidos : v[0].apellidos,
          correo : v[0].correo,
          telefono : v[0].telefono
        }
        res.send(req.session.user);
        res.render('admin',{title: "Gelish",message:"Bienvenido"});
      }else res.sendStatus(404); //not found
    });
  }

  static logout(req, res){
    if(!req.session.user) return res.sendStatus(412) //precondition failed
    req.session.user = undefined;
    res.sendStatus(200);
  }
}

module.exports = Sesion;
