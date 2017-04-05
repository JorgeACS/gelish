class UsuarioDB{
  static get(pool,tipo,func){
    pool.getConnection(function (err, db) {
      if(err) {
        console.log(err);
        console.log("Error en la conexion");
        db.release();
        return func(null,err);
      }
      db.query("SELECT * FROM Usuario where tipo = ?", [tipo], function (err, rows) {
        if(err) {
          console.log(err);
          db.release();
          func(null,err);
        }
        else {
          db.release();
          func(rows);
        }
      });
    });
  }

  static put(pool,data,func){
    pool.getConnection(function (err, db) {
      if(err) {
        console.log(err);
        console.log("Error en la conexion");
        db.release();
        return func(null,err);
      }
      db.query("UPDATE Usuario SET ? WHERE id = ?", [data.usuario,data.id], function (err, insertId) {
        if(err) {
          console.log(err);
          db.release();
          func(null,err);
        }
        else {
          db.release();
          func(insertId);
        }
        
      });
    });
  }
  static delete(pool,id,func){
    pool.getConnection(function (err, db) {
      if(err) {
        console.log(err);
        console.log("Error en la conexion");
        db.release();
        return func(null,err);
      }
      db.query("DELETE FROM Usuario WHERE id = ?", [id], function (err, deleteId) {
        if(err) {
          console.log(err);
          db.release();
          func(null,err);
        }
        else {
          db.release();
          func(deleteId);
        }
        
      });
    });
  }
    static post(pool,data,func){
      pool.getConnection(function (err, db) {
        if(err) {
          console.log("Error en la conexion");
          return func(null,err);
        }
        db.beginTransaction(function (err){
          if(err) {
            db.release();
            return func(null,err);
          }
        
          db.query("INSERT INTO Usuario SET ?", [data.usuario], function (err, usuario) {
            if(err) {
              console.log(err);
              db.rollback();
              db.release();
              return func(null,err);
            }
            var insertValues = {
              usuario_id : usuario.insertId
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
                  insertValues.tecnica_id = tecnica.insertId;
                  return func(insertValues);
                }

              });
            }else{
              db.commit();
              db.release();
              return func(insertValues)
            }
            db.release();
          });
        });
      });
    }
}

module.exports = UsuarioDB;
