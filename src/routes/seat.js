const routes = require('express').Router()
const seatController = require('../controllers/seat')
const authMiddleware = require('../middleware/auth')
const validator = require('../middleware/validator')

routes.post('/', authMiddleware.authCheck, validator.valdationResult, seatController.createSeat)
routes.get('/sold', authMiddleware.authCheck, seatController.getSeatSold)
routes.get('/:id', authMiddleware.authCheck, seatController.getDetailSeat)
routes.get('/', authMiddleware.authCheck, seatController.getSeat)

module.exports = routes
