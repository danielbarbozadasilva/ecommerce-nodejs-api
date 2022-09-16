const joi = require('joi')
const storeController = require('../../controllers/controllers.store')
const validateDTOMiddleware = require('../../utils/middlewares/middlewares.validate-dto')
const verifyIdDbMiddleware = require('../../utils/middlewares/middlewares.verify-exists')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorization = require('../../utils/middlewares/middlewares.authorization')

module.exports = (router) => {
  router
    .route('/store')
    .get(storeController.listAllStoresController)
    .post(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('STORE_CREATE'),
      validateDTOMiddleware('body', {
        cnpj: joi
          .string()
          .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/)
          .required()
          .messages({
            'any.required': '"cnpj" is a required field',
            'string.empty': '"cnpj" can not be empty'
          }),
        name: joi.string().required().messages({
          'any.required': '"name" is a required field',
          'string.empty': '"name" can not be empty'
        }),
        email: joi.string().required().messages({
          'any.required': '"email" is a required field',
          'string.empty': '"email" can not be empty'
        }),
        phones: joi.array().required().messages({
          'any.required': '"phones" is a required field',
          'array.empty': '"phones" can not be empty'
        }),
        address: joi.object({
          location: joi.string().required().messages({
            'any.required': '"location" is a required field',
            'string.empty': '"location" can not be empty'
          }),
          number: joi.string().required().messages({
            'any.required': '"number" is a required field',
            'string.empty': '"number" can not be empty'
          }),
          complement: joi.string().required().messages({
            'any.required': '"complement" is a required field',
            'string.empty': '"complement" can not be empty'
          }),
          district: joi.string().required().messages({
            'any.required': '"district" is a required field',
            'string.empty': '"district" can not be empty'
          }),
          city: joi.string().required().messages({
            'any.required': '"city" is a required field',
            'string.empty': '"city" can not be empty'
          }),
          zipCode: joi.string().required().messages({
            'any.required': '"zipCode" is a required field',
            'string.empty': '"zipCode" can not be empty'
          })
        })
      }),
      verifyIdDbMiddleware.verifyEmailStoreExists,
      verifyIdDbMiddleware.verifyCnpjStoreExists,
      storeController.createStoreController
    )

  router
    .route('/store/:storeid')
    .get(
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
    .put(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('STORE_UPDATE'),
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
        cnpj: joi
          .string()
          .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/)
          .required()
          .messages({
            'any.required': '"cnpj" is a required field',
            'string.empty': '"cnpj" can not be empty'
          }),
        name: joi.string().required().messages({
          'any.required': '"name" is a required field',
          'string.empty': '"name" can not be empty'
        }),
        email: joi.string().required().messages({
          'any.required': '"email" is a required field',
          'string.empty': '"email" can not be empty'
        }),
        phones: joi.array().required().messages({
          'any.required': '"phones" is a required field',
          'string.empty': '"phones" can not be empty'
        }),
        address: joi.object({
          location: joi.string().required().messages({
            'any.required': '"location" is a required field',
            'string.empty': '"location" can not be empty'
          }),
          number: joi.string().required().messages({
            'any.required': '"number" is a required field',
            'string.empty': '"number" can not be empty'
          }),
          complement: joi.string().required().messages({
            'any.required': '"complement" is a required field',
            'string.empty': '"complement" can not be empty'
          }),
          district: joi.string().required().messages({
            'any.required': '"district" is a required field',
            'string.empty': '"district" can not be empty'
          }),
          city: joi.string().required().messages({
            'any.required': '"city" is a required field',
            'string.empty': '"city" can not be empty'
          }),
          zipCode: joi.string().required().messages({
            'any.required': '"zipCode" is a required field',
            'string.empty': '"zipCode" can not be empty'
          })
        })
      }),
      verifyIdDbMiddleware.verifyIdStoreDbMiddleware,
      verifyIdDbMiddleware.verifyEmailStoreExists,
      verifyIdDbMiddleware.verifyCnpjStoreExists,
      storeController.updateStoreController
    )
    .delete(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('STORE_DELETE'),
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
      verifyIdDbMiddleware.verifyIdStoreDbMiddleware,
      storeController.deleteStoreController
    )
}
