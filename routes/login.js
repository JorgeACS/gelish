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
    console.log(req.body.username)
    console.log(req.body.password)
    loginDB.get(req.mysql, req.body.username,req.body.password, (value) => {
      if(!value) return res.sendStatus(503) //service unavaliable
      if(value.length == 1){
        req.session.user = {
          id : value[0].id,
          tipo : value[0].tipo,
          nombre : value[0].nombre,
          apellidos : value[0].apellido,
          correo : value[0].correo,
          telefono : value[0].telefono
        }
        //res.render('admin',{title: "Gelish",message:"Bienvenido"});
        res.send(req.session.user);
        
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
