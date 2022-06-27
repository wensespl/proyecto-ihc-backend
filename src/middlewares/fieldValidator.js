const { validationResult } = require('express-validator');

const errorFormatter = ({ location, msg, param }) => {
  return `${location}[${param}]: ${msg}`;
};

const fieldValidator = (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormatter);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.array(),
    });
  }
  next();
};

module.exports = {
  fieldValidator,
};
