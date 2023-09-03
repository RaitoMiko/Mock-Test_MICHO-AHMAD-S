// const express = require('express')
const passport = require('passport');

const router = require("express").Router()
const userController = require('../../controllers/userController')

router.get('/user', passport.authenticate('jwt', { session: false }), userController.getUser)



module.exports = router
