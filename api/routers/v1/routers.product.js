const joi = require('joi')

const validateDTOMiddleware = require('../../utils/middlewares/middlewares.validate-dto')
const verifyIdDbMiddleware = require('../../utils/middlewares/middlewares.verify-exists')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorization = require('../../utils/middlewares/middlewares.authorization')
const productController = require('../../controllers/controllers.product')

module.exports = (router) => {
  router.route('/product').get(
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
      sortType: joi.string(),
      offset: joi.number(),
      limit: joi.number()
    }),
    verifyIdDbMiddleware.verifyIdStoreDbMiddleware,
    productController.listAllProductController
  )
}