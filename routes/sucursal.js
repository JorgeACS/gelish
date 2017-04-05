const Router = require('./jaderouter');

const SucursalDB = require('../entity/SucursalDB');
class Sucursal extends Router{
  get(req,res){
    SucursalDB.get(req.mysql,req.query.sucursal_id,(values,err) => {
      if (err){
        console.log(err);
        res.sendStatus(500);
      }else{
        if(values.length < 1){
          res.sendStatus(200);
        }else{
          res.send(values);
        }
      }
    })
  }
  put(req,res){
    if( 
      req.body.sucursal == null ||
      req.body.sucursal.plaza == null ||
      !validateName(req.body.sucursal.plaza) || 
      req.body.sucursal.ciudad == null ||
      !validateName(req.body.sucursal.ciudad) || 
      req.body.sucursal.telefono == null ||
      isNaN(req.body.sucursal.telefono) ||
      req.body.admin_id == null ||
      req.body.sucursal_id == null || 
      isNaN(req.body.sucursal_id) ||
      isNaN(req.body.admin_id)){
        res.sendStatus(400);
        return false;
    }
    var data = {
      sucursal : req.body.sucursal,
      sucursal_id : req.body.sucursal_id,
      admin_id : req.body.admin_id
    }
    SucursalDB.put(req.mysql,data,(insertIds,err) =>{
      if(insertIds){
        res.send(insertIds);
      }else{
        console.log(err);
        res.sendStatus(500);
      }
    });
  }
  post(req,res){
    var data = {};
    if(req.body.sucursal == null ||
      req.body.sucursal.plaza == null ||
      !validateName(req.body.sucursal.plaza) || 
      req.body.sucursal.ciudad == null ||
      !validateName(req.body.sucursal.ciudad) || 
      req.body.sucursal.telefono == null ||
      isNaN(req.body.sucursal.telefono) ||
    req.body.admin_id == null || 
    isNaN(req.body.admin_id)){
      res.sendStatus(400);
      return false;
    }
    data = {
      sucursal : req.body.sucursal,
      admin_id : req.body.admin_id
    }
    SucursalDB.post(req.mysql,data,(insertIds,err) =>{
      if(err){
        console.log(err);
        res.sendStatus(500);
      }else{
        console.log(insertIds);
        res.send(insertIds);
      }
    });
  }

  delete(req,res){
    if( req.query.id == null||
        isNaN(req.query.id)){
        res.sendStatus(400);
        return false;
    }
    SucursalDB.delete(req.mysql,req.query.id,(deleteId,err) =>{
      if(deleteId){
        res.send(deleteId);
      }else{
        console.log(err);
        res.sendStatus(500);
      }
    });
  }
  
}


function validateName(name){
    var regex = /^[A-Za-z\s]+$/;
    return regex.test(name);
}

module.exports = Sucursal;
