class SucursalDB{
  static post(pool,data,func){
    pool.getConnection(function (err, db) {
      if(err) {
        console.log("Error en la conexion");
        db.release();
        return func(null,err);
      }
      db.beginTransaction(function (err){
          if(err) {
            db.release();
            return func(null,err);
          }
        db.query("INSERT INTO Sucursal SET ?", [data.sucursal], function (err, sucursal) {
          if(err) {
            console.log(err);
            db.rollback();
            db.release();
            return func(null,err);
          }
          var insertIds = {
            sucursal_id : sucursal.insertId
          }
          db.query("UPDATE Usuario SET sucursal_id = ? WHERE id = ? ",[insertIds.sucursal_id,data.admin_id], function(err,admin){
            if(err){
              console.log(err);
              db.rollback();
              db.release();
              return func(null,err);
            }
            insertIds.admin_id = admin.insertId;
            db.commit();
            db.release();
            return func(insertIds);
          });
        });
      });
    });
  }

  static put(pool,data,func){
    pool.getConnection(function (err, db) {
      if(err) {
        console.log("Error en la conexion");
        db.release();
        return func(null,err);
      }
      db.beginTransaction(function (err){
          if(err) {
            db.release();
            return func(null,err);
          }
        db.query("UPDATE Sucursal SET ? WHERE id = ?", [data.sucursal,data.sucursal_id], function (err, sucursal) {
          if(err) {
            db.rollback();
            db.release();
            return func(null,err);
          }
          var insertIds = {
            sucursal_id : data.sucursal_id
          }
          db.query("UPDATE Usuario SET sucursal_id = ? WHERE id = ? ",[data.sucursal_id,data.admin_id], function(err,admin){
            if(err){
              db.rollback();
              db.release();
              return func(null,err);
            }
            insertIds.admin_id = data.admin_id;
            db.commit();
            db.release();
            return func(insertIds);
          });
        });
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
      db.beginTransaction(function(err){
        if(err){
          console.log("Error en la conexion");
          db.release();
          return func(null,err);
        }
        db.query("UPDATE Usuario SET sucursal_id = NULL WHERE sucursal_id = ?",[id],function(err,usuarios){
          if(err){
            db.rollback();
            db.release();
            return func(null,err);
          }
          db.query("DELETE FROM Sucursal WHERE id = ?", [id], function (err, deleteId) {
            if(err) {
              console.log(err);
              db.rollback();
              db.release();
              return func(null,err);
            }
            db.commit();
            db.release();
            return func(deleteId);
          });
        });
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
            db.release();
            return func(null,err);

          }
          return func(sucursal);
        })
      }else{
        db.query("SELECT * FROM Sucursal",function(err,rows){
          if(err){
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