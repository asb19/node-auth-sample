function logError(err,req,res,next) {
  console.error(err.message);
  console.log("in log error")
  next(err)
}

function logErrorMiddleware(err, req, res, next) {
  logError(err);
  next(err);
}

function returnError(err, req, res, next) {
  res.status(err.statusCode || 500).json({status: err.statusCode,message: err.message});
  next(res)
}

function isOperationalError(error) {
  if (error instanceof BaseError) {
    return error.isOperational;
  }
  return false;
}

module.exports = {
  logError,
  logErrorMiddleware,
  returnError,
  isOperationalError,
};
