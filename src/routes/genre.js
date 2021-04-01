const routes = require('express').Router()
const genreController = require('../controllers/genre')
const authMiddleware = require('../middleware/auth')
const validator = require('../middleware/validator')

routes.post('/', authMiddleware.authCheck, validator.valdationResult, genreController.createGenre)
routes.get('/:id', authMiddleware.authCheck, genreController.getDetailGenre)
routes.get('/', authMiddleware.authCheck, genreController.getGenre)

module.exports = routes
