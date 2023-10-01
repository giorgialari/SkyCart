const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { authValidation } = require('../middlewares/validation/auth');
const allowedMethods = require('../middlewares/allowMethod');

router.use(allowedMethods(['POST']));
router.post('/login', authValidation,  authController.login);
router.post('/createUser', authValidation, authController.createUser);


module.exports = router;
