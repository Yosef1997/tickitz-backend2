const routes = require('express').Router()
const cinemaController = require('../controllers/cinema')
const cinemaMiddleware = require('../middleware/uploadCinema')
const authMiddleware = require('../middleware/auth')
const validator = require('../middleware/validator')

routes.post('/', authMiddleware.authCheck, cinemaMiddleware, validator.valdationResult, cinemaController.createCinema)

module.exports = routes
