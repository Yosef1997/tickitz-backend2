const routes = require('express').Router()
const movieController = require('../controllers/movie')
const movieMiddleware = require('../middleware/uploadMovie')
const authMiddleware = require('../middleware/auth')
const validator = require('../middleware/validator')

routes.post('/', authMiddleware.authCheck, movieMiddleware, validator.valdationResult, movieController.createMovie)
routes.get('/:id', authMiddleware.authCheck, movieController.getDetailMovie)
routes.get('/', authMiddleware.authCheck, movieController.getMovie)

module.exports = routes
