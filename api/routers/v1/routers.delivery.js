const joi = require('joi')

const validateDTOMiddleware = require('../../utils/middlewares/middlewares.validate-dto')
const verifyIdDbMiddleware = require('../../utils/middlewares/middlewares.verify-exists')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorization = require('../../utils/middlewares/middlewares.authorization')
const deliveryController = require('../../controllers/controllers.delivery')

module.exports = (router) => {
  router.route('/delivery/:deliveryid').get(
    authenticationMiddleware(),
    authorization.authorizationMiddleware('LIST_DELIVERY'),
    validateDTOMiddleware('params', {
      deliveryid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': '"delivery id" is a required field',
          'string.empty': '"delivery id" can not be empty',
          'string.pattern.base': '"delivery id" out of the expected format'
        })
    }),
    verifyIdDbMiddleware.verifyIdProductDbMiddleware,
    verifyIdDbMiddleware.verifyIdRatingDbMiddleware,
    deliveryController.listByIdDeliveryController
  )
}
