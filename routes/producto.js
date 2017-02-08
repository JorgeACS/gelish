const Router = require('./router');
const ProductoDB = require('../entity/productoDB');
class Producto extends Router{
	get(req,res){
		ProductoDB.get(req.mysql,req.query.id,(values) => {
			if (value.length < 1){
				res.sendStatus(404);
			}else{
				res.send(values)
			}
		})
	}

	post(req,res){
		data = {id : req.body.id};
		ProductoDB.post(req.mysql,data,(insertID) =>{
			if(insertID){
				res.send(insertID)
			}else{
				res.sendStatus(404)
			}
		});
	}

}

module.exports = Producto;
