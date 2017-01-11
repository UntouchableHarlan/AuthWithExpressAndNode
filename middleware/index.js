function loggedOut(req, res, next) {
  if (req.session && req.session.userId) {
    return res.redirect('/profile');
  }

  next();
}

function requiresLogIn(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    return res.redirect('/login');
  }

  next();
}

module.exports.loggedOut = loggedOut;
module.exports.requiresLogIn = requiresLogIn;
