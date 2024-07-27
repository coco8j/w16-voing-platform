const logout = function (req, res, next) {
  try {
    req.logout(function (error) {
      if (error) {
        next(error);
        return;
      }
      res.redirect("/");
    });
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
