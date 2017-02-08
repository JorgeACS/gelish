class UsuarioDB{
    static get(pool,tipo_usuario,func){
      pool.getConnection(function (err, db) {
        if(err) {
          console.log(err);
          console.log("Error en la conexion");
          return func();
        }
        db.query("SELECT * FROM Usuario where tipo = ?", [tipo_usuario], function (err, rows) {
          if(err) {
            console.log(err);
            func();
          }
          else func(rows);
          db.release();
        });
      });
    }
}

module.exports = UsuarioDB;