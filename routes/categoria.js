const Router = require('./jaderouter');

const CategoriaDB = require('../entity/categoriaDB');
class Categoria extends Router{
  get(req,res){
    CategoriaDB.get(req.mysql,(categorias,err) => {
      if (err){
        res.sendStatus(500);
      }else{
        res.send(categorias);
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
    CategoriaDB.post(req.mysql,data,(insertId,err) =>{
      if(insertId){
        res.send(insertId)
      }else{
        console.log(err);
        res.sendStatus(404)
      }
    });
  }*/
  
}

module.exports = Categoria;
