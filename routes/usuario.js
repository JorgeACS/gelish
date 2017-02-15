const Router = require('./jaderouter');

const UsuarioDB = require('../entity/UsuarioDB');
class Usuario extends Router{
  get(req,res){
    UsuarioDB.get(req.mysql,req.query.id,(values) => {
      if (value.length < 1){
        res.sendStatus(404);
      }else{
        res.send(values)
      }
    })
  }
  post(req,res){
    var data = {};
    if( req.body.sucursal_id == null || 
        req.body.username == null ||
        req.body.password == null ||
        req.body.nombre == null ||
        req.body.apellido == null ||
        req.body.correo == null ||
        req.body.telefono == null ||
        req.body.tipo == null ||
        req.body.tipo < 0 ||
        req.body.tipo > 4){
        res.sendStatus(404);
        return false;
    }
    data.usuario = {
    	sucursal_id : req.body.sucursal_id,
    	username : req.body.username,
    	password : req.body.password,
    	nombre : req.body.nombre,
    	apellido : req.body.apellido,
    	correo : req.body.correo,
    	telefono : req.body.telefono,
    	tipo : req.body.tipo
    };
    if (data.tipo == 3){
    	data.tecnica = {
    		estado : true,
    		fecha_alta : new Date()
    	};
    }
    UsuarioDB.post(req.mysql,data,(insertValues) =>{
      if(insertValues){
        res.send(insertValues)
      }else{
        res.sendStatus(404)
      }
    });
  }
  
}

module.exports = Usuario;
