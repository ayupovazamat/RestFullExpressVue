// импортируем /routers/auth/index.js
// импортируем /controllers/auth/index.js

const express = require('express');
const {auth,info} = require('../controllers/user');

const router = express.Router();

router.post('/user/', info.postUserInfo);
router.post('/user/auth', auth.postUserAuth);
router.post('/user/register', auth.postUserRegister);

module.exports = router