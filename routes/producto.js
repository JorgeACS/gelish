const Router = require('./jaderouter');

const ProductoDB = require('../entity/ProductoDB');
class Producto extends Router{
  get(req,res){
    ProductoDB.get(req.mysql,(productos,err) => {
      if (err){
        res.sendStatus(500);
      }else{
        res.send(productos);
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
    ProductoDB.post(req.mysql,data,(insertId,err) =>{
      if(insertId){
        res.send(insertId)
      }else{
        console.log(err);
        res.sendStatus(404)
      }
    });
  }*/
  
}

module.exports = Producto;
