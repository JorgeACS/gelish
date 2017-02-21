var path = require('path');
var express = require('express');
var logger = require('morgan');
const mysql = require('mysql');
var bodyParser = require('body-parser');//leer de los post
var session = require("express-session");

var pool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "root",
  password: '',
  database: "GELISH"
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

var reporteSucursales = require('./routes/reporteSucursales');
var crearNota = require('./routes/crearNota');
var Sesion = require('./routes/login');
var login = require('./routes/login');
var jaderouter = require('./routes/jaderouter');
var Usuario = require('./routes/usuario');


var app = express();

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

//app.set('views', path.join(__dirname, '/views'));
app.set('views', path.join(__dirname, 'views'));
//app.set('views', __dirname + '/views')
app.set('view engine', 'jade');
// Serve static files css javascript imagenes
app.use(express.static(path.join(__dirname, 'public')));

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

app.use('/adminSuc', adminSuc);
app.use('/login', login);
app.use('/usuario', new Usuario().express());

app.use('/reporteSucursales',reporteSucursales);
app.use('/\*.jade', jaderouter);

// Route for everything else.
app.get('/', function (req, res) {
  res.render('login', { title: 'Hey', message: 'Hello there!' })
});

/*app.get('/:nombre', function (req, res) {
  res.render("admin")
});*/


app.listen(3000);
console.log('Listening on port 3000');
module.exports = app;
