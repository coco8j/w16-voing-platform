const auth = function (req, res, next) {
  try {
    if (!req.isAuthenticated()) {
      res.redirect("/login");
      return;
    }

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = auth;
