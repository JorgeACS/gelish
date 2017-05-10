var path = require('path');
var express = require('express');
var logger = require('morgan');
const mysql = require('mysql');
var bodyParser = require('body-parser');//leer de los post
var session = require("express-session");

var pool = mysql.createPool({
  connectionLimit: 10,
  host: "us-cdbr-iron-east-03.cleardb.net",
  user: "bfbe2eb2913282",
  password: '0f2f5fef',
  database: "heroku_fba8509a4371bd7"
});

var admin = require('./routes/admin');

var agregarSucursal = require('./routes/agregarSucursal');
var editarSucursal = require('./routes/editarSucursal');
var eliminarSucursal = require('./routes/eliminarSucursal');

var agregarProducto = require('./routes/agregarProducto');
var editarProducto = require('./routes/editarProducto');
var eliminarProducto = require('./routes/eliminarProducto');

var agregarServicio = require('./routes/agregarServicio');
var editarServicio = require('./routes/editarServicio');
var eliminarServicio = require('./routes/eliminarServicio');

var agregarTecnica = require('./routes/agregarTecnica');
var editarTecnica = require('./routes/editarTecnica');
var eliminarTecnica = require('./routes/eliminarTecnica');

var agregarRecepcionista = require('./routes/agregarRecepcionista');
var editarRecepcionista = require('./routes/editarRecepcionista');
var eliminarRecepcionista = require('./routes/eliminarRecepcionista');


var recepcionista = require('./routes/recepcionista');
var agregarCliente = require('./routes/agregarCliente');
var editarCliente = require('./routes/editarCliente');
//var eliminarCliente = require('./routes/eliminarCliente');



var agregarAdmin = require('./routes/agregarAdmin');
var editarAdmin = require('./routes/editarAdmin');
var eliminarAdmin = require('./routes/eliminarAdmin');
var adminSuc = require('./routes/adminSuc');

var interfazCaja = require('./routes/interfazCaja');
//var abrirCaja = require('./routes/abrirCaja');

var reporteSucursales = require('./routes/reporteSucursales');
var reporteTecnicas = require('./routes/reporteTecnicas');
var crearNota = require('./routes/crearNota');

var login = require('./routes/login');
var Sucursal = require('./routes/sucursal');
var Sesion = require('./routes/login');
var Categoria = require('./routes/categoria');
var Usuario = require('./routes/usuario');
var Producto = require('./routes/producto');
var Servicio = require('./routes/servicio')

var jaderouter = require('./routes/jaderouter');


var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json());//leer parametros de peticion JSON
app.use(bodyParser.urlencoded({ extended: false }));//leer de la url los parametros que se envian

//var Sesion = new Sesion();

app.use(session({
  secret:"NodeG",
  resave:false,
  saveUninitialized: false
}));
app.use(function (req,res,next) {
  req.mysql = pool;
  next();
});

// Log the requests
app.use(logger('dev'));

app.set('views', path.join(__dirname, 'views'));
//app.set('views', __dirname + '/views')
app.set('view engine', 'jade');
// Serve static files css javascript imagenes
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(__dirname, '/public'));
app.use(function(req, res, next){
  res.locals.user = req.session.user;
  res.locals.caja_id = req.session.caja_id;
  next();
});

app.use(new Sesion());
app.use('/admin', admin);
app.use('/agregarAdmin', agregarAdmin);
app.use('/editarAdmin', editarAdmin);
app.use('/eliminarAdmin', eliminarAdmin);
app.use('/agregarSucursal', agregarSucursal);
app.use('/editarSucursal', editarSucursal);
app.use('/eliminarSucursal', eliminarSucursal);

app.use('/agregarProducto', agregarProducto);
app.use('/editarProducto', editarProducto);
app.use('/eliminarProducto', eliminarProducto);

app.use('/agregarServicio', agregarServicio);
app.use('/editarServicio', editarServicio);
app.use('/eliminarServicio', eliminarServicio);

app.use('/agregarRecepcionista', agregarRecepcionista);
app.use('/editarRecepcionista', editarRecepcionista);
app.use('/eliminarRecepcionista', eliminarRecepcionista);

app.use('/agregarTecnica', agregarTecnica);
app.use('/editarTecnica', editarTecnica);
app.use('/eliminarTecnica', eliminarTecnica);

app.use('/recepcionista', recepcionista);
app.use('/agregarCliente', agregarCliente);
app.use('/editarCliente', editarCliente);
//app.use('/eliminarCliente', eliminarCliente);
app.use('/crearNota', crearNota);

app.use('/interfazCaja', interfazCaja);
//app.use('/abrirCaja', recepcionista);

app.use('/adminSuc', adminSuc);
app.use('/login', login);

app.use('/categoria',new Categoria().express())
app.use('/sucursal',new Sucursal().express())
app.use('/usuario', new Usuario().express());
app.use('/producto', new Producto().express());
app.use('/servicio', new Servicio().express());

app.use('/reporteSucursales',reporteSucursales);
app.use('/reporteTecnicas',reporteTecnicas);

app.use('/\*.jade', jaderouter);

// Route for everything else.
app.get('/', function (req, res) {
  if(req.session && req.session.user){
    //si ya hay una sesion activa en el servidor, hacemos el redireccionamiento correspondiente
    switch(req.session.user.tipo){
      case 0:
        //redireccionamiento para admin
        res.render('admin',{title: 'Gelish',message: 'Bienvenido'})
        break;
      case 1:
        //redireccionamiento para administrador de sucursal
        res.render('adminSuc',{title: 'Gelish',message: 'Bienvenido'})
        break;
      case 2:
        //redireccionamiento para recepcionista
        res.render('recepcionista',{title: 'Gelish',message: 'Bienvenido'})
        break;
        //NOTA
        //Este caso no deberia de pasar, ya que indica que hubo login con un tipo de cuenta no valida.
        //Por lo pronto borro la sesion para que vuelva a login, pero hay que ver si esto tiene cambios
        //inesperados
      default:
        req.session.user == null;
        req.session.caja_id == null;
        res.render('login',{title: 'Gelish',message: 'Ingrese sus datos'})
    }
  }
  else{
    res.render('login', { title: 'Gelish', message: 'Ingrese sus datos' })
  }
});


/*app.get('/:nombre', function (req, res) {
  res.render("admin")
});*/


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

//app.listen(3000);
//console.log('Listening on port 3000');
module.exports = app;
