const routes = require('express').Router()
const dateController = require('../controllers/date')
const authMiddleware = require('../middleware/auth')
const validator = require('../middleware/validator')

routes.post('/', authMiddleware.authCheck, validator.valdationResult, dateController.createDate)
routes.get('/:id', authMiddleware.authCheck, dateController.getDetailDate)
routes.get('/', authMiddleware.authCheck, dateController.getDate)

module.exports = routes
