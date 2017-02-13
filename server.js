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
var recepcionista = require('./routes/recepcionista');
var agregarAdmin = require('./routes/agregarAdmin');
var editarAdmin = require('./routes/editarAdmin');
var eliminarAdmin = require('./routes/eliminarAdmin');
var adminSuc = require('./routes/adminSuc');
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
app.use('/agregarSucursal', agregarSucursal);
app.use('/editarAdmin', editarAdmin);
app.use('/eliminarAdmin', eliminarAdmin);
app.use('/recepcionista', recepcionista);
app.use('/adminSuc', adminSuc);
app.use('/login', login);
app.use('/usuario', new Usuario());

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
