module.exports.ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("SUCCESS AUTH REQ.USER VVVV");
    console.log(req.user);
    next();
  } else {
    // req.flash("error_msg", "Please log in to view this resource");
    console.log("FAILED AUTH REQ.USER VVVV");
    console.log(req.user);
    res.redirect("/login");
  }
};
