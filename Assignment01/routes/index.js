var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Project Assignment 1 – Web Frameworks and APIs' });
});

module.exports = router;
