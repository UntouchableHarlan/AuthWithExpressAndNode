var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  return res.render('index');
});

router.get('/about', function(req, res, next) {
  return res.render('about');
});

router.get('/contact', function(req, res, next) {
  return res.render('contact');
});

router.get('/register', function(req, res, next) {
  return res.render('register');
})

router.post('/register', function(req, res, next) {
  return res.send('User created')
});

module.exports = router;
