const { check } = require('express-validator');

exports.authValidation = [
  check('username') .isString().withMessage('Name must be a string'),
  check('password').isString().withMessage('Password must be a string'),
  check('name').isString().withMessage('Name must be a string'),

];
