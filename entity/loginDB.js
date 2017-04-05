class LoginDB{
    static get(pool, username,password,func){
      pool.getConnection(function (err, db) {
        if(err) {
          console.log(err);
          console.log("Error en la conexion");
           db.release();
          return func(null,err);
        }
        db.query("SELECT * FROM Usuario where username = ? AND password = ?", [username,password], function (err, users) {
          if(err) {
            console.log(err);
             db.release();
            return func(null,err);
          }
          if(users[0] == null){
            db.release();
            return func(null,null)
          }
          var data = {
            user : users[0]
          }
          if (users[0].tipo == 2){
            db.query("SELECT * FROM Sucursal WHERE id = ?",[users[0].sucursal_id],function(err,sucursal){
              if(err){
                console.log(err);
                db.release();
                return func(null,err);
              }
              data.caja_id = sucursal[0].caja_id;
              db.release();
              return func(data,null);
            });
          }else{
            db.release();
            return func(data,null);
          }
        });
      });
    }
}

module.exports = LoginDB;