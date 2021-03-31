const routes = require('express').Router()
const cinemaController = require('../controllers/cinema')
const cinemaMiddleware = require('../middleware/uploadCinema')
const authMiddleware = require('../middleware/auth')
const validator = require('../middleware/validator')

routes.post('/', authMiddleware.authCheck, cinemaMiddleware, validator.valdationResult, cinemaController.createCinema)
routes.get('/:id', authMiddleware.authCheck, cinemaController.getDetailCinema)
routes.get('/', authMiddleware.authCheck, cinemaController.getCinema)

module.exports = routes
