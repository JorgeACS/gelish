var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render("agregarRecepcionista");
});

module.exports = router;
