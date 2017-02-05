class loginDB{
    static get(pool, username,password,func){
      pool.getConnection(function (err, db) {
        if(err) {
          console.log(err);
          console.log("Error en la conexion");
          return func();
        }
        db.query("SELECT * FROM Usuario where username = ? AND password = ?", [username,password], function (err, rows) {
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
