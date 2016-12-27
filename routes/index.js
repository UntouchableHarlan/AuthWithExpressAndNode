var express = require('express');
var router = express.Router();
var User  = require('../models/user');

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
  // All fields validation
  if (req.body.email && req.body.name && req.body.password && req.body.passwordConfirmation) {

    // password validation
    if (req.body.password !== req.body.passwordConfirmation) {
      var err = new Error('Passwords do not match');
      err.status = 400;
      return next(err);
    }

    //create object
    var userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };

    User.create(userData, function(error, user) {
      if (error) {
        return next(error);
      } else {
        return res.redirect('/profile');
      }
    })
  } else {
    var err = new Error('All fields required');
    err.status = 400;
    return next(err);
  }
});

module.exports = router;
