function allowMethods(allowedMethods) {
  return (req, res, next) => {
    if (!allowedMethods.includes(req.method)) {
      const error = new Error();
      error.type = "method.not.allowed";
      return next(error);
      // return res.status(405).json({ error: "Method Not Allowed" });
    }
    next();
  };
}

module.exports = allowMethods;
