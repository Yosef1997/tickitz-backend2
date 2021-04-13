const routes = require('express').Router()
const purchaseController = require('../controllers/purchase')
const authMiddleware = require('../middleware/auth')
const validator = require('../middleware/validator')

routes.post('/', authMiddleware.authCheck, validator.valdationResult, purchaseController.createPurchase)
// routes.patch('/', authMiddleware.authCheck, validator.valdationResult, purchaseController.seatPurchase)
routes.get('/history', authMiddleware.authCheck, purchaseController.getDetailPurchase)
routes.get('/', authMiddleware.authCheck, purchaseController.getPurchase)

module.exports = routes
