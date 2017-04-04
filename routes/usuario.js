const Router = require('./jaderouter');

const UsuarioDB = require('../entity/UsuarioDB');
class Usuario extends Router{
  get(req,res){
    UsuarioDB.get(req.mysql,req.query.tipo,(usuarios,err) => {
      if (usuarios == null || usuarios.length < 1){
        res.sendStatus(404);
      }else{
        res.send(usuarios)
      }
    })
  }

  put(req,res){
    if( req.body.id == null ||
        req.body.usuario.nombre == null ||
        req.body.usuario.apellido == null ||
        req.body.usuario.correo == null ||
        req.body.usuario.telefono == null){
        res.sendStatus(400);
        return false;
    }
    var data = {
      usuario : req.body.usuario,
      id : req.body.id
    }
    UsuarioDB.put(req.mysql,data,(insertId,err) =>{
      if(insertId){
        res.send(insertId);
      }else{
        console.log(err);
        res.sendStatus(404);
      }
    });
  }

  delete(req,res){
    if( req.query.id == null){
        res.sendStatus(400);
        return false;
    }
    UsuarioDB.delete(req.mysql,req.query.id,(deleteId,err) =>{
      if(deleteId){
        res.send(deleteId);
      }else{
        console.log(err);
        res.sendStatus(404);
      }
    });
  }
  post(req,res){
    console.log("hola");
    var data = {};
    if( req.body.username == null ||
        req.body.password == null ||
        req.body.nombre == null ||
        req.body.apellido == null ||
        req.body.correo == null ||
        req.body.telefono == null ||
        req.body.tipo == null ||
        req.body.tipo < 0 ||
        req.body.tipo > 4){
        res.sendStatus(400);
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
    UsuarioDB.post(req.mysql,data,(insertValues,err) =>{
      if(insertValues){
        res.send(insertValues)
      }else{
        console.log(err);
        res.sendStatus(404);
      }
    });
  }

}

module.exports = Usuario;
