const Subscriber = require("../models/subscriber");
exports.getAllSubcribers = (req, res, next) => {
  Subscriber.find({}, (error,subscribers) => {
    if (error) next(error);
    res.render('subscribe',{subscribers: subscribers})
    next()
  })
}

exports.postSubscriber = (req, res, next) => {
  let newSubscriber = new Subscriber(req.body);
  newSubscriber.save((err, document) => {
    if (err) console.error(err);
    res.json(document);
  });
};

exports.newSubscriber = (req, res, next) => {
  res.render('newSubscribe');
}