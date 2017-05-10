class ServicioDB{
  static post(pool,data,func){
    pool.getConnection(function (err, db) {
      if(err) {
        console.log(err);
        return func(null,err);
      }
      db.query("INSERT INTO Servicio SET ?", [data], function (err, servicio) {
        if(err) {
          console.log(err);
          db.release();
          return func(null,err);
        }
        var insertId = servicio.insertId;
       
          db.commit();
          db.release();
          return func(insertId)
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
      db.query("UPDATE Servicio SET ? WHERE id = ?", [data.servicio,data.id], function (err, insertId) {
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
      db.query("DELETE FROM Servicio WHERE id = ?", [id], function (err, deleteId) {
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
  static get(pool,id,func){
    pool.getConnection(function(err,db){
      if(err){
        console.log("error en la conexion");
        db.release();
        return func(null,err);
      }
      //this is like cheating :
      // because we validated id earlier, it will never be 
      // null by the time it reaches this function.
      // This if-else was a leftover from when you could search for all products
      if(id != null){
        db.query("SELECT * FROM Servicio WHERE sucursal_id = ?",[id],function(err,servicio){
          if(err){
            console.log(err);
            db.release();
            return func(null,err);

          }
          return func(servicio);
        })
      }else{
        db.query("SELECT * FROM Servicio",function(err,rows){
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

module.exports = ServicioDB;