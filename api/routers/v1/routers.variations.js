const joi = require('joi').extend(require('@joi/date'))

const validateDTOMiddleware = require('../../utils/middlewares/middlewares.validate-dto')
const verifyIdDbMiddleware = require('../../utils/middlewares/middlewares.verify-exists')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorization = require('../../utils/middlewares/middlewares.authorization')
const fileUpload = require('../../utils/utils.file')
const variationsController = require('../../controllers/controllers.variations')

module.exports = (router) => {
  router
    .route('/variation')
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
        promotion: joi.number().optional(),
        delivery: joi
          .object({
            dimensions: joi
              .object({
                height: joi.number().required().messages({
                  'any.required': '"height" is a required field',
                  'number.empty': '"height" can not be empty'
                }),
                width: joi.number().required().messages({
                  'any.required': '"width" is a required field',
                  'number.empty': '"width" can not be empty'
                }),
                depth: joi.number().required().messages({
                  'any.required': '"depth" is a required field',
                  'number.empty': '"depth" can not be empty'
                })
              })
              .required(),
            weight: joi.number().required().messages({
              'any.required': '"weight" is a required field',
              'number.empty': '"weight" can not be empty'
            }),
            freeShipping: joi.boolean().optional()
          })
          .optional(),
        quantity: joi.number().optional(),
        photos: joi.array().items(joi.string()).optional()
      }),
      verifyIdDbMiddleware.verifyIdStoreDbMiddleware,
      variationsController.createVariationsController
    )

  router
    .route('/variation/:variationid')
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
        promotion: joi.number().optional(),
        delivery: joi
          .object({
            dimensions: joi
              .object({
                height: joi.number().required().messages({
                  'any.required': '"height" is a required field',
                  'number.empty': '"height" can not be empty'
                }),
                width: joi.number().required().messages({
                  'any.required': '"width" is a required field',
                  'number.empty': '"width" can not be empty'
                }),
                depth: joi.number().required().messages({
                  'any.required': '"depth" is a required field',
                  'number.empty': '"depth" can not be empty'
                })
              })
              .required(),
            weight: joi.number().required().messages({
              'any.required': '"weight" is a required field',
              'number.empty': '"weight" can not be empty'
            }),
            freeShipping: joi.boolean().optional()
          })
          .optional(),
        quantity: joi.number().optional()
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

  router.route('/variation/images/:variationid').put(
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
    fileUpload.array('files', 4),
    verifyIdDbMiddleware.verifyIdStoreDbMiddleware,
    verifyIdDbMiddleware.verifyIdProductDbMiddleware,
    verifyIdDbMiddleware.verifyIdVariationDbMiddleware,
    variationsController.updateImageVariationController
  )
}
