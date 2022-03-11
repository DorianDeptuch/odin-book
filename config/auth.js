module.exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("AUTH REQ.USER VVVV");
    console.log(req.user);
    next();
  } else {
    // req.flash("error_msg", "Please log in to view this resource");
    res.redirect("/login");
  }
};
