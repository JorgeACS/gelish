class ProductoDB{
  static post(pool,data,func){
    pool.getConnection(function (err, db) {
      if(err) {
        console.log("Error en la conexion");
        db.release();
        return func(null,err);
      }
      db.query("INSERT INTO Producto SET ?", [data], function (err, producto) {
        if(err) {
          console.log(err);
          db.release();
          return func(null,err);
        }
        var insertId = producto.insertId;
       
          db.commit();
          db.release();
          return func(insertId)
      });
    });
  }
  static get(pool,id,func){
    pool.getConnection(function(err,db){
      if(err){
        console.log("error en la conexion");
        db.release();
        return func(null,err);
      }
      if(id != null){
        db.query("SELECT * FROM Producto WHERE id = ?",[id],function(err,producto){
          if(err){
            console.log(err);
            db.release();
            return func(null,err);

          }
          return func(producto);
        })
      }else{
        db.query("SELECT * FROM Producto",function(err,rows){
          if(err){
            console.log(err);
            db.release();
            return func(null,err)
          }else{
            db.release();
            return func(rows);
          }
        });
      }
    }); 
  }
}

module.exports = ProductoDB;