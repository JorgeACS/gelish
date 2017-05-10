class UsuarioDB{
  static get(pool,tipo,func){
    pool.getConnection(function (err, db) {
      if(err) {
        console.log(err);
        return func(null,err);
      }
      db.query("SELECT * FROM Usuario where tipo = ?", [tipo], function (err, tecnicas) {
        if(err) {
          console.log(err);
          db.release();
          func(null,err);
        }
        else {
          if(tipo == 3 && tecnicas.length > 0){
            var ids = [];
            for(var i = 0; i < tecnicas.length;i++){
              ids.push(tecnicas[i].id)
            }
            db.query("SELECT * FROM Tecnica where usuario_id in (?) ",[ids],function (err,datosTecnicas){
              if(err){
                console.log(err);
                db.release();
                func(null,err);
              }
              for(var i = 0; i < datosTecnicas.length;i++){
                tecnicas[i].estado = datosTecnicas[i];
              }
              db.release();
              func(tecnicas);
            });
          }else{
            db.release();
            func(tecnicas);
          }
         
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
      db.beginTransaction(function(err){
        if(err){
          console.log(err);
          db.release();
          func(err);
        }
        db.query("UPDATE Usuario SET ? WHERE id = ?", [data.usuario,data.id], function (err, insertId) {
          if(err) {
            console.log(err);
            db.release();
            func(null,err);
          }
          else {
            if(data.tecnica){
              db.query("UPDATE Tecnica SET ?",[data.tecnica],function(err,insertId){
                if(err){
                  db.rollback();
                  db.release();
                  func(err);
                }else{
                  db.commit();
                  //db.release();
                  func(insertId);
                }
              })
            }else{
              db.commit();
              //db.release();
              func(insertId);
            }
          }
        });
      });
    });
  }
  static delete(pool,id,tecnica,func){
    pool.getConnection(function (err, db) {
      if(err) {
        console.log(err);
        console.log("Error en la conexion");
        db.release();
        return func(null,err);
      }
      db.beginTransaction(function(err){
        if(err){
          db.release();
          func(err);
        }
        if(tecnica){
          db.query("DELETE FROM Tecnica WHERE usuario_id = ?", [id], function(err,deleteId){
            if(err){
              console.log(err);
              db.rollback();
              db.release();
              func(err);
            }
            db.query("DELETE FROM Usuario WHERE id = ?", [id], function (err, deleteId) {
              if(err) {
                console.log(err);
                db.rollback();
                db.release();
                func(null,err);
              }
              else {
                db.commit();
                //db.release();
                func(deleteId);
              }
              
            });//delete usuario query
          });//delete tecnica query
        }else{
          db.query("DELETE FROM Usuario WHERE id = ?", [id], function (err, deleteId) {
            if(err) {
              console.log(err);
              db.rollback();
              db.release();
              func(null,err);
            }
            else {
              db.commit();
              //db.release();
              func(deleteId);
            }
          });//delete usuario query
        }
      });//begin transaction      
    });//getConnection
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
                }
                db.commit();
                //db.release();
                insertValues.tecnica_id = tecnica.insertId;
                return func(insertValues);

              });
            }else{
              db.commit();
            }
            //db.release();
            return func(insertValues)
          });
        });
      });
    }
}

module.exports = UsuarioDB;
