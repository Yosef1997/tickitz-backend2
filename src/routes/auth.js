const routes = require('express').Router()
const authController = require('../controllers/auth')
// const authMiddleware = require('../middleware/auth')

routes.post('/register', authController.register)
routes.post('/login', authController.login)

module.exports = routes
