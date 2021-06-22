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
