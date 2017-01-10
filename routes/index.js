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
        req.session.userId = user._id
        return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error('All fields required');
    err.status = 400;
    return next(err);
  }
});

router.get('/login', function(req, res, next) {
  return res.render('login');
});

router.post('/login', function(req, res, next) {
  // return res.render('profile');
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function(error, user) {
      if (error || !user) {
        var err = new Error('Email or Password incorrect');
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = user._id
        return res.render('profile');
      }
    })
  } else {
    var err = new Error('Both email and password fields required')
    err.status = 400;
    return next(err);
  }
});

router.get('/profile', function(req, res, next) {
  if (!req.session.userId) {
    var err = new Error('Please login to view your profile');
    err.status = 403;
    return next(err)
  }

  User.findById(req.session.userId)
    .exec(function(error, user) {
      if (error) {
        return next(error);
      } else {
        return res.render('profile', { name: user.name })
      }
    })
});


router.get('/logout', function(req, res, next) {
  if (req.session) {
    req.session.destroy(function(err) {
      if (err) {
        return next(err);
      } else {
        return res.render('/');
      }
    })
  }
})

module.exports = router;
