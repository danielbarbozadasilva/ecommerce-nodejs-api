const joi = require('joi')

const validateDTOMiddleware = require('../../utils/middlewares/middlewares.validate-dto')
const verifyIdDbMiddleware = require('../../utils/middlewares/middlewares.verify-exists')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const fileUpload = require('../../utils/utils.file')
const authorization = require('../../utils/middlewares/middlewares.authorization')
const productController = require('../../controllers/controllers.product')

module.exports = (router) => {
  router
    .route('/product')
    .get(
      validateDTOMiddleware('query', {
        sortType: joi.string(),
        offset: joi.number(),
        limit: joi.number()
      }),
      productController.listAllProductController
    )
    .post(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('CREATE_PRODUCT'),
      validateDTOMiddleware('body', {
        title: joi.string().required().messages({
          'any.required': '"title" is a required field',
          'string.empty': '"title" can not be empty'
        }),
        description: joi.string().required().messages({
          'any.required': '"description" is a required field',
          'string.empty': '"description" can not be empty'
        }),
        category: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"category id" is a required field',
            'string.empty': '"category id" can not be empty',
            'string.pattern.base': '"category id" out of the expected format'
          }),
        price: joi.number().required().messages({
          'any.required': '"price" is a required field',
          'number.empty': '"price" can not be empty'
        }),
        promotion: joi.number().required().messages({
          'any.required': '"promotion" is a required field',
          'number.empty': '"promotion" can not be empty'
        }),
        sku: joi.string().required().messages({
          'any.required': '"sku" is a required field',
          'string.empty': '"sku" can not be empty'
        }),
        quantity: joi.number().required().messages({
          'any.required': '"quantity" is a required field',
          'number.empty': '"quantity" can not be empty'
        }),
        dimensions: joi.object({
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
        }),
        weight: joi.number().required().messages({
          'any.required': '"weight" is a required field',
          'number.empty': '"weight" can not be empty'
        }),
        freeShipping: joi.boolean().required().messages({
          'any.required': '"freeShipping" is a required field',
          'boolean.empty': '"freeShipping" can not be empty'
        }),
        shipping: joi.number().required().messages({
          'any.required': '"shipping" is a required field',
          'number.empty': '"shipping" can not be empty'
        })
      }),
      productController.createProductController
    )

  router.route('/product/available').get(
    validateDTOMiddleware('query', {
      sortType: joi.string(),
      offset: joi.number(),
      limit: joi.number()
    }),
    productController.listAvailableProductController
  )

  router
    .route('/product/:productid')
    .get(
      validateDTOMiddleware('params', {
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
      productController.listByIdProductController
    )
    .put(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('UPDATE_PRODUCT'),
      validateDTOMiddleware('params', {
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
        title: joi.string().required().messages({
          'any.required': '"title" is a required field',
          'string.empty': '"title" can not be empty'
        }),
        description: joi.string().required().messages({
          'any.required': '"description" is a required field',
          'string.empty': '"description" can not be empty'
        }),
        category: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"category id" is a required field',
            'string.empty': '"category id" can not be empty',
            'string.pattern.base': '"category id" out of the expected format'
          }),
        photos: joi.array().items(joi.string()).optional(),
        price: joi.number().required().messages({
          'any.required': '"price" is a required field',
          'number.empty': '"price" can not be empty'
        }),
        promotion: joi.number().required().messages({
          'any.required': '"promotion" is a required field',
          'number.empty': '"promotion" can not be empty'
        }),
        sku: joi.string().required().messages({
          'any.required': '"sku" is a required field',
          'string.empty': '"sku" can not be empty'
        }),
        availability: joi.boolean().required().messages({
          'any.required': '"availability" is a required field',
          'boolean.empty': '"availability" can not be empty'
        }),
        quantity: joi.number().required().messages({
          'any.required': '"quantity" is a required field',
          'number.empty': '"quantity" can not be empty'
        }),
        dimensions: joi.object({
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
        }),
        weight: joi.number().required().messages({
          'any.required': '"weight" is a required field',
          'number.empty': '"weight" can not be empty'
        }),
        freeShipping: joi.boolean().required().messages({
          'any.required': '"freeShipping" is a required field',
          'boolean.empty': '"freeShipping" can not be empty'
        }),
        shipping: joi.number().required().messages({
          'any.required': '"shipping" is a required field',
          'number.empty': '"shipping" can not be empty'
        })
      }),
      verifyIdDbMiddleware.verifyIdProductDbMiddleware,
      productController.updateProductController
    )
    .delete(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('DELETE_PRODUCT'),
      validateDTOMiddleware('params', {
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
      productController.deleteProductController
    )

  router.route('/product/images/:productid').put(
    authenticationMiddleware(),
    authorization.authorizationMiddleware('UPLOAD_IMAGE_PRODUCT'),
    validateDTOMiddleware('params', {
      productid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': '"id" is a required field',
          'string.empty': '"id" can not be empty',
          'string.pattern.base': '"id" out of the expected format'
        })
    }),
    verifyIdDbMiddleware.verifyIdProductDbMiddleware,
    fileUpload.array('files', 4),
    productController.updateImageProductController
  )

  router.route('/product/search/:search').get(
    validateDTOMiddleware('params', {
      search: joi.string().required().messages({
        'any.required': '"search" is a required field',
        'string.empty': '"search" can not be empty'
      })
    }),
    validateDTOMiddleware('query', {
      sortType: joi.string(),
      offset: joi.number(),
      limit: joi.number()
    }),
    productController.searchProductController
  )

  router.route('/product/:productid/rating').get(
    validateDTOMiddleware('params', {
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
    productController.listRatingProductController
  )
}
