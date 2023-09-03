const express = require('express');

const router = express.Router();
const authController = require('../../controllers/authController');


// Middleware Passport-JWT untuk autentikasi
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;
