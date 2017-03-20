class SucursalDB{
  static post(pool,data,func){
    pool.getConnection(function (err, db) {
      if(err) {
        console.log("Error en la conexion");
        db.release();
        return func(null,err);
      }
      db.query("INSERT INTO Sucursal SET ?", [data], function (err, sucursal) {
        if(err) {
          console.log(err);
          db.release();
          return func(null,err);
        }
        var insertId = sucursal.insertId;
       
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
        db.query("SELECT * FROM Sucursal WHERE id = ?",[id],function(err,sucursal){
          if(err){
            console.log(err);
            db.release();
            return func(null,err);

          }
          return func(sucursal);
        })
      }else{
        db.query("SELECT * FROM Sucursal",function(err,rows){
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

module.exports = SucursalDB;