const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    subscribedAccount: { type: Schema.Types.ObjectId, ref: "subscriber" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
