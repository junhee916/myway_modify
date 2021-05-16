const express = require('express')
const checkAuth = require('../middleware/check-auth')
const {
    users_login_user,
    users_signup_user,
    users_get_all,
    users_delete_user,
    users_get_user
} = require('../controller/user')
const router = express.Router()

// get userInfo
router.get('/', users_get_all)

// detail get userInfo
router.get('/:userId', users_get_user)

// signup
router.post('/signup', users_signup_user)

// login
router.post('/login', users_login_user)

// detial delete userInfo
router.delete('/:userId', checkAuth, users_delete_user)

module.exports = router