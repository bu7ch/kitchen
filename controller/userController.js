const User = require("../models/user");

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
  let userParams = new User(getUserParams(req.body));
  User.create(userParams)
    .then((user) => {
      console.log(user.fullName);
      req.flash("success", `${user.fullName} création du compte avec succes.`);

      next();
    })
    .catch((err) => {
      console.log(`Erreur lors de la sauvegarde : ${err.message}`);
      res.redirect("/users/new");
      req.flash(
        "error",
        `Erreur lors de la création d'un user : ${err.message}`
      );
      next();
    });
  // userParams.save((err, user) => {
  //   if (err) next(err);

  //   res.json(user);
  // });
};

exports.login = (req, res) => {
  res.render("users/login");
};

exports.authenticate = (req, res, next) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user && user.password === req.body.password) {
      res.redirect(`/users/${user._id}`);
      req.flash("success", ` ${user.fullName} s'est connecté avec succes`);
      next();
    } else {
      req.flash("error", "Votre email ou votre password ne sont inexacte");
      res.redirect("/users/login");
      next();
    }
  });
};
exports.show = (req, res, next) => {
  let userId = req.params.id;
  User.findById(userId, (err, user) => {
    if (err) next(err);

    res.render("users/show", { user: user });
  });
};
