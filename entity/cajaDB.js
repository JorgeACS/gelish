class CajaDB{
  static post(pool,data,func){
    pool.getConnection(function (err, db) {
      if(err) {
        console.log("Error en la conexion");
        db.release();
        return func(null,err);
      }
      db.query("INSERT INTO Caja SET ?", [data], function (err, caja) {
        if(err) {
          console.log(err);
          db.rollback();
          db.release();
          return func(null,err);
        }
        var insertId = caja.insertId;
       
          db.commit();
          db.release();
          return func(insertId)
      });
    });
  }
  static get(pool,id,func){
    pool.getConnnection(function(err,db){
      if(err){
        console.log("error en la conexion");
        db.release();
        return func(null,err);
      }
      if(id != null){
        db.query("SELECT * FROM Caja WHERE id = ?",[id],function(err,caja){
          if(err){
            console.log(err);
            db.release();
            return func(null,err);

          }
          return func(caja.insertId);
        })
      }else{
        db.query("SELECT * FROM Caja",function(err,rows){
          if(err){
            console.log(err);
            db.release();

          }
          db.release();
          return func(rows);
        });
      }
    }); 
  }
}

module.exports = CajaDB;