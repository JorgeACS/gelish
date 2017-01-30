var path = require('path');
var express = require('express');
var logger = require('morgan');
const mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit: 100,
  host: "localhost",
  user: "admin",
  password: 'gelish123',
  database: "GELISH"
});

var app = express();

app.use(function (req,res,next) {
  req.mysql = pool;
  next();
});

// Log the requests
app.use(logger('dev'));

app.set('views', __dirname + '/views')
app.set('view engine', 'jade')
// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Route for everything else.
app.get('/', function (req, res) {
  res.render('login', { title: 'Hey', message: 'Hello there!' })
})
// Fire it up!
app.listen(3000);
console.log('Listening on port 3000');