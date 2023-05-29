const ApiError = require("../exceptions/api-error");

module.exports = async (err, req, res, next) => {
  try {
    if (err instanceof ApiError) {
      res.status(err.status).send(err.message);
    }
  } catch (e) {
    console.log(e);
  }
};
