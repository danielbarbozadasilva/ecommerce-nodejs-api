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

  router
    .route('/store/:storeid')
    .get(
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
    .put(
      authenticationMiddleware(),
      authorizationMiddleware('STORE_UPDATE'),
      validateDTOMiddleware('params', {
        storeid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"storeid id" is a required field',
            'string.empty': '"storeid id" can not be empty',
            'string.pattern.base': '"storeid id" out of the expected format'
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
        phone: joi.string().required().messages({
          'any.required': '"phone" is a required field',
          'string.empty': '"phone" can not be empty'
        }),
        address: joi.string().required().messages({
          'any.required': '"address" is a required field',
          'string.empty': '"address" can not be empty'
        })
      }),
      verifyIdDbMiddleware.verifyIdStoreDbMiddleware,
      storeController.updateStoreController
    )
    .delete(
      authenticationMiddleware(),
      authorizationMiddleware('STORE_DELETE'),
      validateDTOMiddleware('params', {
        storeid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"storeid id" is a required field',
            'string.empty': '"storeid id" can not be empty',
            'string.pattern.base': '"storeid id" out of the expected format'
          })
      }),
      verifyIdDbMiddleware.verifyIdStoreDbMiddleware,
      storeController.deleteStoreController
    )
}
