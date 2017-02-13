const express = require('express');

class Router {
  get(req, res){ res.status(404).end(); }
  getAll(req, res){ res.status(404),end(); }
  post(req, res){ res.status(400).end(); }
  put(req, res){ res.status(404).end(); }
  delete(req, res){ res.status(404).end(); }
  express(){
    var router = express.Router();
    router.get('/', (req, res) => this.get(req, res));
    router.post('/', (req, res) => this.post(req, res));
    router.put('/', (req, res) => this.put(req, res));
    router.delete('/', (req, res) => this.delete(req, res));
    return router;
  }
}

module.exports = Router
