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
    		estado : req.body.estado,
    		fecha_alta : new Date()
    	};
    }
    UsuarioDB.post(req.mysql,data,(insertID) =>{
      if(insertID){
        res.send(insertID)
      }else{
        res.sendStatus(404)
      }
    });
  }

}

module.exports = UsuarioDB;
