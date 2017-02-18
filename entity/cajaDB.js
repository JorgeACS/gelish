class CajaDB{
  static post(pool,data,func){
    pool.getConnection(function (err, db) {
      if(err) {
        console.log("Error en la conexion");
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
}

module.exports = CajaDB;