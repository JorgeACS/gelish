const Router = require('./jaderouter');

const ServicioDB = require('../entity/servicioDB');
class Servicio extends Router{
  
  get(req,res){
    if(req.session.user == null || req.session.user.sucursal_id == null || isNaN(req.session.user.sucursal_id)){
      res.sendStatus(404);
    }
    var sucursal_id = req.session.user.sucursal_id;
    ServicioDB.get(req.mysql,sucursal_id,(servicios,err) => {
      if(err){
        res.sendStatus(500);
      }else{
        res.send(servicios);
      }
    })
  }
  
  post(req,res){
    var servicio = req.body;
    if(req.session.user == null || req.session.user.sucursal_id == null){
      res.sendStatus(400);
      return false;
    }
    servicio.sucursal_id = req.session.user.sucursal_id;
    console.log(res.locals.sucursal_id);
    if( servicio.nombre == null ||
        servicio.descripcion == null ||
        servicio.precio == null ||
        isNaN(servicio.precio) ||
        servicio.sucursal_id == null ||
        isNaN(servicio.sucursal_id))
    {
      res.sendStatus(400);
      return false;
    }
    ServicioDB.post(req.mysql,servicio,(insertId,err) =>{
      if(insertId){
        var id = {insert_id:insertId}
        res.send(id);
      }else{
        console.log(err);
        res.sendStatus(404)
      }
    });
  }

  put(req,res){
    //Validando parametros
    if( req.body.servicio.nombre == null ||
        req.body.servicio.descripcion == null ||
        req.body.servicio.precio == null ||
        isNaN(req.body.servicio.precio) ||
        req.body.id == null || 
        isNaN(req.body.id) ||
        req.body.sucursal_id == null ||
        isNaN(req.body.sucursal_id))
    {
      res.sendStatus(400);
      return false;
    }
    ServicioDB.put(req.mysql,req.body,(insertId,err) =>{
      if(insertId){
        var id = {insert_id:insertId}
        res.send(id);
      }else{
        console.log(err);
        res.sendStatus(404)
      }
    });
  }
 
  delete(req,res){
    if( req.query.id == null||
        isNaN(req.query.id)){
        res.sendStatus(400);
        return false;
    }
    ServicioDB.delete(req.mysql,req.query.id,(deleteId,err) =>{
      if(deleteId){
        res.send(deleteId);
      }else{
        console.log(err);
        res.sendStatus(404);
      }
    });
  } 
}

module.exports = Servicio;
