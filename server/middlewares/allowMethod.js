function allowMethods(allowedMethods) {
  return (req, res, next) => {
    if (!allowedMethods.includes(req.method)) {
      const error = new Error();
      error.type = "method.not.allowed";
      return next(error);
    }
    next();
  };
}

module.exports = allowMethods;
