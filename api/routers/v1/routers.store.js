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
      authorizationMiddleware('STORE_LIST'),
      storeController.listAllStoresController
    )

  router.route('/store/:storeid').get(
    authenticationMiddleware(),
    authorizationMiddleware('STORE_LIST_ID'),
    validateDTOMiddleware('params', {
      storeid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': '"store id" is a required field',
          'string.empty': '"store id" can not be empty',
          'string.pattern.base': '"store id" out of the expected format'
        })
    }),
    verifyIdDbMiddleware.verifyIdStoreDbMiddleware,
    storeController.listByIdStoreController
  )
}
