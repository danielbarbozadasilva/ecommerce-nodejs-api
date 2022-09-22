const joi = require('joi')

const validateDTOMiddleware = require('../../utils/middlewares/middlewares.validate-dto')
const verifyIdDbMiddleware = require('../../utils/middlewares/middlewares.verify-exists')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const middlewareFileUploadMiddleware = require('../../utils/middlewares/middlewares.file-upload')
const authorization = require('../../utils/middlewares/middlewares.authorization')
const productController = require('../../controllers/controllers.product')

module.exports = (router) => {
  router
    .route('/product')
    .get(
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
    .post(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('CREATE_PRODUCT'),
      // middlewareFileUploadMiddleware('products'),
      validateDTOMiddleware('query', {
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
      validateDTOMiddleware('body', {
        title: joi.string().required().messages({
          'any.required': '"title" is a required field',
          'string.empty': '"title" can not be empty'
        }),
        availability: joi.string().required().messages({
          'any.required': '"availability" is a required field',
          'string.empty': '"availability" can not be empty'
        }),
        description: joi.string().required().messages({
          'any.required': '"description" is a required field',
          'string.empty': '"description" can not be empty'
        }),
        // photos: joi.string().required().messages({
        //   'any.required': '"photos" is a required field',
        //   'string.empty': '"photos" can not be empty'
        // }),
        price: joi.string().required().messages({
          'any.required': '"price" is a required field',
          'string.empty': '"price" can not be empty'
        }),
        promotion: joi.string().required().messages({
          'any.required': '"promotion" is a required field',
          'string.empty': '"promotion" can not be empty'
        }),
        sku: joi.string().required().messages({
          'any.required': '"sku" is a required field',
          'string.empty': '"sku" can not be empty'
        }),
        category: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"category id" is a required field',
            'string.empty': '"category id" can not be empty',
            'string.pattern.base': '"category id" out of the expected format'
          })
      }),
      verifyIdDbMiddleware.verifyIdStoreDbMiddleware,
      productController.createProductController
    )
}
