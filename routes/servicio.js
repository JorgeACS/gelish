const Router = require('./router');
const ServicioDB = require('../entity/servicioDB');
class Servicio extends Router{
	get(req,res){
		ServicioDB.get(req.mysql,req.query.id,(values) => {
			if (value.length < 1){
				res.sendStatus(404);
			}else{
				res.send(values)
			}
		})
	}

	post(req,res){
		data = {id : req.body.id};
		ServicioDB.post(req.mysql,data,(insertID) =>{
			if(insertID){
				res.send(insertID)
			}else{
				res.sendStatus(404)
			}
		});
	}

}

module.exports = Servicio;
