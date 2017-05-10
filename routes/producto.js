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
    if( req.body.producto.nombre == null ||
        req.body.producto.descripcion == null ||
        req.body.producto.cantidad == null || 
        isNaN(req.body.producto.cantidad) ||
        req.body.producto.precio == null ||
        isNaN(req.body.producto.precio) ||
        req.body.producto.categoria_id == null ||
        isNaN(req.body.producto.categoria_id) ||
        req.body.id == null || 
        isNaN(req.body.id))
    {
      res.sendStatus(400);
      return false;
    }
    ProductoDB.put(req.mysql,req.body,(insertId,err) =>{
      if(insertId){
        var id = {insert_id:insertId}
        res.send(id);
      }else{
        console.log(err);
        res.sendStatus(404)
      }
    });
  }
  
}

module.exports = Producto;
