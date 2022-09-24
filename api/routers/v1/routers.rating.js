const joi = require('joi')

const validateDTOMiddleware = require('../../utils/middlewares/middlewares.validate-dto')
const verifyIdDbMiddleware = require('../../utils/middlewares/middlewares.verify-exists')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorization = require('../../utils/middlewares/middlewares.authorization')
const ratingController = require('../../controllers/controllers.rating')

module.exports = (router) => {
  router.route('/rating').get(
    authenticationMiddleware(),
    authorization.authorizationMiddleware('LIST_RATING'),
    validateDTOMiddleware('query', {
      storeid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': '"store id" is a required field',
          'string.empty': '"store id" can not be empty',
          'string.pattern.base': '"store id" out of the expected format'
        }),
      productid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': '"product id" is a required field',
          'string.empty': '"product id" can not be empty',
          'string.pattern.base': '"product id" out of the expected format'
        })
    }),
    verifyIdDbMiddleware.verifyIdStoreDbMiddleware,
    verifyIdDbMiddleware.verifyIdProductDbMiddleware,
    ratingController.listRatingProductController
  )
}
