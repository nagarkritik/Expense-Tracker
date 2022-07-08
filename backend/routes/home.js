const express = require('express')
const userController = require('../controllers/home')
const authorizationController = require('../authorization/autorrization')
const homeController = require('../controllers/home')

const router = express.Router()


router.post('/home/addExpense', authorizationController.authenticateToken, homeController.postExpense)
router.get('/home/getExpenses',authorizationController.authenticateToken, homeController.getAllExpenses)

module.exports = router