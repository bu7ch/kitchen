const httpStatus = require('http-status-codes')

exports.logErrors = (error, req, res, next) => {
  console.error(error.stack);
  next(errror)
}

exports.respondNoRessourceFound = (req, res) => {
let errorCode = httpStatus.StatusCodes.NOT_FOUND;
res.status(errorCode);
res.send(`${errorCode} | La page n'existe pas!`)
}
