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
    loginDB.get(req.mysql, req.body.username,req.body.password, (value,err) => {
      if(err) return res.sendStatus(503) //service unavaliable
      if(!value) return res.sendStatus(404); //No hubo user
      if(value.user){
        req.session.user = {
          id : value.user.id,
          tipo : value.user.tipo,
          nombre : value.user.nombre,
          apellidos : value.user.apellido,
          correo : value.user.correo,
          telefono : value.user.telefono,
          sucursal_id : value.user.sucursal_id
        }
        if(value.caja_id){
          req.session.caja_id = value.caja_id
          console.log("caja id" + value.caja_id)
        }else{
          console.log("no caja id")
        }
        //res.render('admin',{title: "Gelish",message:"Bienvenido"});
        res.send(req.session.user);
        
      }else res.sendStatus(404); //not found
    });
  }

  static logout(req, res){
    if(!req.session.user) return res.sendStatus(412) //precondition failed
    req.session.user = undefined;
    req.session.caja_id = undefined;
    res.sendStatus(200);
  }
}

module.exports = Sesion;
