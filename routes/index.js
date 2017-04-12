var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/addJob', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/checkJob', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
