const Router = require('./jaderouter');

const ProductoDB = require('../entity/productoDB');
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
  
  post(req,res){
    var sucursal = req.body.sucursal;
    if( sucursal.nombre == null ||
        sucursal.descripcion == null ||
        sucursal.cantidad == null || 
        isNaN(sucursal.cantidad) ||
        sucursal.precio == null ||
        isNaN(sucursal.precio) ||
        sucursal.categoria_id == null ||
        isNaN(sucursal.categoria_id))
    {
      res.sendStatus(400);
      return false;
    }
    ProductoDB.post(req.mysql,sucursal,(insertId,err) =>{
      if(insertId){
        res.send(insertId)
      }else{
        console.log(err);
        res.sendStatus(404)
      }
    });
  }
  
}

module.exports = Producto;
