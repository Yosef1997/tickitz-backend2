const routes = require('express').Router()
const locationController = require('../controllers/location')
const authMiddleware = require('../middleware/auth')
const validator = require('../middleware/validator')

routes.post('/', authMiddleware.authCheck, validator.valdationResult, locationController.createLocation)
routes.get('/:id', authMiddleware.authCheck, locationController.getDetailLocation)
routes.get('/', authMiddleware.authCheck, locationController.getLocation)

module.exports = routes
