const Router = require('./jaderouter');

const UsuarioDB = require('../entity/usuarioDB');
class Usuario extends Router{
  get(req,res){
    if(req.query.tipo == null ||
        isNaN(req.query.tipo) ||
        req.query.tipo < 0 || 
        req.query.tipo > 4){
      res.sendStatus(400);
    }
    UsuarioDB.get(req.mysql,req.query.tipo,(usuarios,err) => {
      if (err){
        res.sendStatus(500);
      }else{
        if(usuarios.length < 1)
        {
          res.sendStatus(200);
        }else{
          res.send(usuarios);
        }
        
      }
    })
  }

  put(req,res){
    if( req.body.id == null ||
        isNaN(req.body.id) ||
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
    if(req.body.tecnica){
      data.tecnica = {
        estado : req.body.tecnica.estado
      }
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
    if( req.query.id == null||
        isNaN(req.query.id)){
        res.sendStatus(400);
        return false;
    }
    var tecnica;
    if(req.query.tecnica == null)
      tecnica = false;
    else{
      tecnica = true;
    }
    UsuarioDB.delete(req.mysql,req.query.id,tecnica,(deleteId,err) =>{
      if(deleteId){
        res.send(deleteId);
      }else{
        console.log(err);
        res.sendStatus(404);
      }
    });
  }
  post(req,res){
    var data = {};
    console.log(req.body);
    if( 
        (req.body.tipo != 3 && req.body.username == null || req.body.password == null) || //tecnicas no tienen login
        req.body.nombre == null ||
        !validateName(req.body.nombre) ||
        req.body.apellido == null ||
        !validateName(req.body.apellido) || 
        req.body.correo == null ||
        !validateEmail(req.body.correo) || 
        req.body.telefono == null ||
        isNaN(req.body.telefono) || 
        req.body.tipo == null ||
        isNaN(req.body.tipo) ||
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

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function validateName(name){
    var regex = /^[A-Za-z\s]+$/;
    return regex.test(name);
}
module.exports = Usuario;
