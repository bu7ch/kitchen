const User = require("../models/user");
const passport = require("passport");
const { check, validationResult } = require("express-validator");

const getUserParams = (body) => {
  return {
    name: {
      first: body.first,
      last: body.last,
    },
    email: body.email,
    zipCode: body.zipcode,
    password: body.password,
  };
};

exports.index = (req, res) => {
  User.find({})
    .then((users) => {
      res.render(
        "users/index",
        { users: users },
        { flashMessages: { success: "chargement des utilisateurs" } }
      );
    })
    .catch((err) => {
      console.log(`Pas d'utilisateurs : ${err.message}`);
      res.redirect("/");
    });
};
exports.new = (req, res) => {
  res.render("users/new");
};

exports.create = (req, res, next) => {
  let newUser = new User(getUserParams(req.body));
  User.register(newUser, req.body.password, (error, user) => {
    if (user) {
      req.flash("success", `${user.fullName} création du compte avec succes.`);
      res.redirect("/users");
      next();
    } else {
      req.flash(
        "error",
        `Erreur le compte n'à pas pu être créé : ${error.message} .`
      );
      res.redirect("/users/new");
      next();
    }
  });
  // User.create(userParams)
  //   .then((user) => {
  //     console.log(user.fullName);
  //     req.flash("success", `${user.fullName} création du compte avec succes.`);

  //     next();
  //   })
  //   .catch((err) => {
  //     console.log(`Erreur lors de la sauvegarde : ${err.message}`);
  //     res.redirect("/users/new");
  //     req.flash(
  //       "error",
  //       `Erreur lors de la création d'un user : ${err.message}`
  //     );
  //     next();
  //   });
  // userParams.save((err, user) => {
  //   if (err) next(err);

  //   res.json(user);
  // });
};

exports.login = (req, res) => {
  res.render("users/login");
};
exports.authenticate = passport.authenticate("local", {
  failureRedirect: "/users/login",
  failureFlash: "Erreur de connexion.",
  successRedirect: "/",
  successFlash: "Connecté!"
});
// User.findOne({ email: req.body.email }).then((user) => {
//   if (user && user.password === req.body.password) {
//     res.redirect(`/users/${user._id}`);
//     req.flash("success", ` ${user.fullName} s'est connecté avec succes`);
//     next();
//   } else {
//     req.flash("error", "Votre email ou votre password ne sont inexacte");
//     res.redirect("/users/login");
//     next();
//   }
// });
exports.logout = (req, res, next) => {
  req.logout();
  req.flash("success", "Vous avez été déconnecté");
  res.redirect("/");
  next();
};
exports.show = (req, res, next) => {
  let userId = req.params.id;
  User.findById(userId, (err, user) => {
    if (err) next(err);
    res.render("users/show", { user: user });
  });
};
exports.validate = (req, res, next) => { 
  req.check("email", "l'email est invalide").isEmail().normalizeEmail({
    all_lowercase: true,
  }).trim();
  req
    .check("zipCode", "Code postal est invalide")
    .notEmpty()
    .isInt()
    .isLength({
      min: 5,
      max: 5,
    })
    .equals(req.body.zipCode);

  req.check("password", "Le password ne peut pas être vide").notEmpty();

  req.validationResult().then((err) => {
    if (!err.isEmpty()) {
      let messages = err.array().map((e) => e.message);
      req.skip = true;
      req.flash("error", messages.join(" and "));
      res.redirect("/users/new");
      next();
    } else {
      next();
    }
  });
};
