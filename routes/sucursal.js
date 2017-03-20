const Router = require('./jaderouter');

const SucursalDB = require('../entity/SucursalDB');
class Sucursal extends Router{
  get(req,res){
    SucursalDB.get(req.mysql,req.query.sucursal_id,(values,err) => {
      if (err){
        res.sendStatus(500);
      }else{
        req.session.caja_id = values[0].caja_id
        console.log(values[0].caja_id);
        res.send(values[0]);
      }
    })
  }
  /*
  post(req,res){
    var data = {};
    if( req.body.recepcionista_id == null){
        res.sendStatus(404);
        return false;
    }
    data = {
      recepcionista_id : req.body.recepcionista_id,
      fecha_apertura : new Date()
    }
    SucursalDB.post(req.mysql,data,(insertId,err) =>{
      if(insertId){
        res.send(insertId)
      }else{
        console.log(err);
        res.sendStatus(404)
      }
    });
  }*/
  
}

module.exports = Sucursal;
