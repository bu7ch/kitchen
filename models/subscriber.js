const mongoose = require('mongoose')
const Schema = mongoose.Schema


const subscriberSchema = new Schema({
  name: String,
  email: String,
  password: String,
  zipCode: Number
})

const Subscriber = mongoose.model("Subscriber", subscriberSchema)

module.exports = Subscriber;