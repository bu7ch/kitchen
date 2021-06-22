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
      res.render("users/index", { users: users });
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
  userParams.save((err, user) => {
    if (err) next(err);

    res.json(user);
  });
};
