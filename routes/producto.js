const Router = require('./jaderouter');

const ProductoDB = require('../entity/productoDB');
class Producto extends Router{
  
  get(req,res){
    if(req.session.user == null || req.session.user.sucursal_id == null || isNaN(req.session.user.sucursal_id)){
      res.sendStatus(404);
    }
    var sucursal_id = req.session.user.sucursal_id;
    ProductoDB.get(req.mysql,sucursal_id,(productos,err) => {
      if(err){
        res.sendStatus(500);
      }else{
        res.send(productos);
      }
    })
  }
  
  post(req,res){
    var producto = req.body;
    if(req.session.user == null || req.session.user.sucursal_id == null){
      res.sendStatus(400);
      return false;
    }
    producto.sucursal_id = req.session.user.sucursal_id;
    console.log(res.locals.sucursal_id);
    if( producto.nombre == null ||
        producto.descripcion == null ||
        producto.cantidad == null || 
        isNaN(producto.cantidad) ||
        producto.precio == null ||
        isNaN(producto.precio) ||
        producto.categoria_id == null ||
        isNaN(producto.categoria_id) ||
        producto.sucursal_id == null ||
        isNaN(producto.sucursal_id))
    {
      res.sendStatus(400);
      return false;
    }
    ProductoDB.post(req.mysql,producto,(insertId,err) =>{
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
