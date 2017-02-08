const Router = require('./router');
const SucursalDB = require('../entity/sucursalDB');
class Sucursal extends Router{
	get(req,res){
		SucursalDB.get(req.mysql,req.query.id,(values) => {
			if (value.length < 1){
				res.sendStatus(404);
			}else{
				res.send(values)
			}
		})
	}

	post(req,res){
		data = {id : req.body.id};
		SucursalDB.post(req.mysql,data,(insertID) =>{
			if(insertID){
				res.send(insertID)
			}else{
				res.sendStatus(404)
			}
		});
	}

}

module.exports = Sucursal;
