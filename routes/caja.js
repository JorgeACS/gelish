const Router = require('./jaderouter');

const CajaDB = require('../entity/CajaDB');
class Caja extends Router{
  get(req,res){
    CajaDB.get(req.mysql,req.query.id,(values) => {
      if (value.length < 1){
        res.sendStatus(404);
      }else{
        res.send(values)
      }
    })
  }
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
    CajaDB.post(req.mysql,data,(insertId,err) =>{
      if(insertId){
        res.send(insertId)
      }else{
        console.log(err);
        res.sendStatus(404)
      }
    });
  }
  
}

module.exports = Caja;
