const joi = require('joi')
const storeController = require('../../controllers/controllers.store')
const validateDTOMiddleware = require('../../utils/middlewares/middlewares.validate-dto')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorizationMiddleware = require('../../utils/middlewares/middlewares.authorization')
const verifyIdDbMiddleware = require('../../utils/middlewares/middlewares.verify-exists')

module.exports = (router) => {
  router
    .route('/store')
    .get(
      authenticationMiddleware(),
      authorizationMiddleware('*'),
      storeController.listAllStoresController
    )
}
