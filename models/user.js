const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Subscriber = require("./subscriber");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema(
  {
    name: {
      first: { type: String, trim: true },
      last: { type: String, trim: true },
    },
    email: { type: String, required: true, lowercase: true, unique: true },
    zipcode: {
      type: Number,
      min: [900, "Le code postal est trop court"],
      max: 9999,
    },
    password: { type: String, required: true },
    subscribedAccount: { type: Schema.Types.ObjectId, ref: "Subscriber" },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  let user = this;
  if (user.subscribedAccount === undefined) {
    Subscriber.findOne({
      email: user.email,
    })
      .then((subscriber) => {
        user.subscribedAccount = subscriber;
        next();
      })
      .catch((error) => {
        console.log(`Erreur sur l'inscrit: ${error.message}`);
        next(error);
      });
  } else {
    next();
  }
});
userSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`;
});
userSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});

module.exports = mongoose.model("User", userSchema);
