
const Router = require('./router');
const UsuarioDB = require('../entity/UsuarioDB');
class Usuario extends Router{
  get(req,res){
    UsuarioDB.get(req.mysql,req.query.id,(values) => {
      if (value.length < 1){
        res.sendStatus(404);
      }else{
        res.send(values)
      }
    })
  }

  post(req,res){
    data = {id : req.body.id};
    UsuarioDB.post(req.mysql,data,(insertID) =>{
      if(insertID){
        res.send(insertID)
      }else{
        res.sendStatus(404)
      }
    });
  }

}

module.exports = UsuarioDB;
