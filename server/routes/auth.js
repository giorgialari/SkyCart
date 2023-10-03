const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { authValidation } = require('../middlewares/validation/auth');
const allowedMethods = require('../middlewares/allowMethod');

router.post('/login',  allowedMethods(['POST']), authValidation,  authController.login);
router.post('/createUser',  allowedMethods(['POST']), authValidation, authController.createUser);


module.exports = router;
