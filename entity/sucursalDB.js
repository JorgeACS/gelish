class SucursalDB{
    static get(pool,tipo_usuario,func){
      pool.getConnection(function (err, db) {
        if(err) {
          console.log(err);
          console.log("Error en la conexion");
          return func();
        }
        db.query("SELECT * FROM Sucursal", [tipo_usuario], function (err, rows) {
          if(err) {
            console.log(err);
            func();
          }
          else func(rows);
          db.release();
        });
      });
    }
    static post(pool,data,func){
      pool.getConnection(function (err, db) {
        if(err) {
          console.log(err);
          console.log("Error en la conexion");
          return func();
        }
        db.query("INSERT INTO Sucursal SET ? ", [data], function (err, value) {
          if(err) {
            console.log(err);
            func();
          }
          else func(value.insertId);
          db.release();
        });
      });
    }
}

module.exports = SucursalDB;