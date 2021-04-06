const express = require('express');
const authController = require('../controller/auth.controller');

const router = express.Router();

router.get('/login', authController.login);
router.post('/singup', authController.singup);

module.exports = router;
