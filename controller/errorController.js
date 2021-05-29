const httpStatus = require('http-status-codes')

exports.logErrors = (error, req, res, next) => {
  console.error(error.stack);
  next(error)
}

exports.respondNoRessourceFound = (req, res) => {
let errorCode = httpStatus.StatusCodes.NOT_FOUND;
res.status(errorCode);
res.render('404')
}
