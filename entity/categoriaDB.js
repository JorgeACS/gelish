class CategoriaDB{
  static post(pool,data,func){
    pool.getConnection(function (err, db) {
      if(err) {
        console.log("Error en la conexion");
        db.release();
        return func(null,err);
      }
      db.query("INSERT INTO Categoria SET ?", [data], function (err, categoria) {
        if(err) {
          console.log(err);
          db.release();
          return func(null,err);
        }
        var insertId = categoria.insertId;
       
          db.commit();
          db.release();
          return func(insertId)
      });
    });
  }
  static get(pool,func){
    pool.getConnection(function(err,db){
      if(err){
        console.log("error en la conexion");
        db.release();
        return func(null,err);
      }
      db.query("SELECT * FROM Categoria",function(err,rows){
        if(err){
          console.log(err);
          db.release();
          return func(null,err)
        }else{
          db.release();
          return func(rows);
        }
      });
    }); 
  }
}

module.exports = CategoriaDB;