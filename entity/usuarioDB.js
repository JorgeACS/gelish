class UsuarioDB{
    static post(pool,data,func){
      pool.getConnection(function (err, db) {
        if(err) {
          console.log("Error en la conexion");
          return func(null,err);
        }
        db.beginTransaction(function (err){
          if(err) return func(null,err)
        });
        db.query("INSERT INTO Usuario SET ?", [data.usuario], function (err, usuario) {
          if(err) {
            console.log(err);
            db.rollback();
            db.release();
            return func(null,err);
          }
          if(data.tecnica && data.usuario.tipo == 3){
            data.tecnica.usuario_id = usuario.insertId;
            db.query("INSERT INTO Tecnica SET ?",[data.tecnica],function(err, tecnica){
              if(err){
                console.log(err);
                db.rollback();
                db.release();
                return func(null,err);
              }else{
                db.commit();
                db.release();
                return func([usuario.insertId,tecnica.insertId]);
              }

            });
          }else{
            db.commit();
            db.release();
            return func(usuario.insertId)
          }
          db.release();
        });
      });
    }
}

module.exports = UsuarioDB;