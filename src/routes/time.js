const routes = require('express').Router()
const timeController = require('../controllers/time')
const authMiddleware = require('../middleware/auth')
const validator = require('../middleware/validator')

routes.post('/', authMiddleware.authCheck, validator.valdationResult, timeController.createTime)
routes.get('/:id', authMiddleware.authCheck, timeController.getDetailTime)
routes.get('/', authMiddleware.authCheck, timeController.getTime)

module.exports = routes
