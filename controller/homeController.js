exports.welcome = (req, res) => {
  res.render('index')
};
exports.respondWithMyName = (req, res) => {
  // let paramsName = req.params.myName;
  res.render('index',{name: paramsName})
};

