const routes = require('express').Router()
const profileController = require('../controllers/profile')
const authMiddleware = require('../middleware/auth')
const profileMiddleware = require('../middleware/uploadProfile')
const validator = require('../middleware/validator')

routes.patch('/profile', authMiddleware.authCheck, profileMiddleware, validator.valdationResult, validator.updateUser, profileController.updateUser)
routes.patch('/picture', authMiddleware.authCheck, profileMiddleware, validator.valdationResult, validator.updateUser, profileController.updatePicture)
routes.delete('/delete', authMiddleware.authCheck, profileController.deletePicture)

module.exports = routes
