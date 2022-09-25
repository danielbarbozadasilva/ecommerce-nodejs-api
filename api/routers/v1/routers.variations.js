const joi = require('joi').extend(require('@joi/date'))

const validateDTOMiddleware = require('../../utils/middlewares/middlewares.validate-dto')
const verifyIdDbMiddleware = require('../../utils/middlewares/middlewares.verify-exists')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorization = require('../../utils/middlewares/middlewares.authorization')
const fileUpload = require('../../utils/utils.file')
const variationsController = require('../../controllers/controllers.variations')

module.exports = (router) => {
  router
    .route('/variations')
    .get(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('LIST_VARIATIONS'),
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
      variationsController.listVariationsController
    )
    .post(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('CREATE_VARIATION'),
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
      validateDTOMiddleware('body', {
        code: joi.string().required().messages({
          'any.required': '"code" is a required field',
          'string.empty': '"code" can not be empty'
        }),
        name: joi.string().required().messages({
          'any.required': '"name" is a required field',
          'string.empty': '"name" can not be empty'
        }),
        price: joi.number().required().messages({
          'any.required': '"price" is a required field',
          'number.empty': '"price" can not be empty'
        }),
        promotion: joi.string().required().messages({
          'any.required': '"promotion" is a required field',
          'string.empty': '"promotion" can not be empty'
        }),
        delivery: joi.string().required().messages({
          'any.required': '"delivery" is a required field',
          'string.empty': '"delivery" can not be empty'
        }),
        quantity: joi.number().required().messages({
          'any.required': '"quantity" is a required field',
          'number.empty': '"quantity" can not be empty'
        })
      }),
      verifyIdDbMiddleware.verifyIdStoreDbMiddleware,
      variationsController.createVariationsController
    )

  router
    .route('/variations/:variationid')
    .get(
      validateDTOMiddleware('params', {
        variationid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"variation id" is a required field',
            'string.empty': '"variation id" can not be empty',
            'string.pattern.base': '"variation id" out of the expected format'
          })
      }),
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
      verifyIdDbMiddleware.verifyIdProductDbMiddleware,
      verifyIdDbMiddleware.verifyIdStoreDbMiddleware,
      verifyIdDbMiddleware.verifyIdVariationDbMiddleware,
      variationsController.listByIdVariationsController
    )
    .put(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('UPDATE_VARIATION'),
      validateDTOMiddleware('params', {
        variationid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"variation id" is a required field',
            'string.empty': '"variation id" can not be empty',
            'string.pattern.base': '"variation id" out of the expected format'
          })
      }),
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
      validateDTOMiddleware('body', {
        code: joi.string().required().messages({
          'any.required': '"code" is a required field',
          'string.empty': '"code" can not be empty'
        }),
        name: joi.string().required().messages({
          'any.required': '"name" is a required field',
          'string.empty': '"name" can not be empty'
        }),
        price: joi.number().required().messages({
          'any.required': '"price" is a required field',
          'number.empty': '"price" can not be empty'
        }),
        promotion: joi.string().required().messages({
          'any.required': '"promotion" is a required field',
          'string.empty': '"promotion" can not be empty'
        }),
        delivery: joi.string().required().messages({
          'any.required': '"delivery" is a required field',
          'string.empty': '"delivery" can not be empty'
        }),
        quantity: joi.number().required().messages({
          'any.required': '"quantity" is a required field',
          'number.empty': '"quantity" can not be empty'
        }),
        photos: joi.array().items(joi.string()).optional()
      }),
      verifyIdDbMiddleware.verifyIdStoreDbMiddleware,
      verifyIdDbMiddleware.verifyIdProductDbMiddleware,
      verifyIdDbMiddleware.verifyIdVariationDbMiddleware,
      variationsController.updateVariationsController
    )
    .delete(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('DELETE_VARIATION'),
      validateDTOMiddleware('params', {
        variationid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"variation id" is a required field',
            'string.empty': '"variation id" can not be empty',
            'string.pattern.base': '"variation id" out of the expected format'
          })
      }),
      verifyIdDbMiddleware.verifyIdVariationDbMiddleware,
      variationsController.deleteVariationsController
    )

  router.route('/variations/images/:variationid').put(
    authenticationMiddleware(),
    authorization.authorizationMiddleware('UPLOAD_IMAGE_VARIATION'),
    validateDTOMiddleware('params', {
      variationid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': '"variation id" is a required field',
          'string.empty': '"variation id" can not be empty',
          'string.pattern.base': '"variation id" out of the expected format'
        })
    }),
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
    fileUpload.array('files', 4),
    verifyIdDbMiddleware.verifyIdStoreDbMiddleware,
    verifyIdDbMiddleware.verifyIdProductDbMiddleware,
    verifyIdDbMiddleware.verifyIdVariationDbMiddleware,
    variationsController.updateImageVariationController
  )
}
