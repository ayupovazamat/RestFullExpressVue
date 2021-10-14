// импортируем /routers/auth/index.js
// импортируем /controllers/auth/index.js

const express = require('express')
const {auth} = require('../controllers/user')

const router = express.Router()

router.post('/user/', auth.postUserAuth)
router.post('/user/auth', auth.postUserAuth)
router.post('/user/register', auth.postUserRegister)

module.exports = router