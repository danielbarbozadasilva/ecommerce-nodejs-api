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
        sortType: joi.string().allow(null, ''),
        itemsPerPage: joi.string().allow(null, ''),
        page: joi.string().allow(null, '')
      }),
      productController.listAllProductController
    )
    .post(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('CREATE_PRODUCT'),
      fileUpload.array('files', 4),
      productController.createProductController
    )

  router.route('/product/dashboard').get(
    validateDTOMiddleware('query', {
      sortType: joi.string().allow(null, '')
    }),
    productController.listProductController
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
      verifyIdDbMiddleware.verifyIdProduct,
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
      fileUpload.array('files', 4),
      verifyIdDbMiddleware.verifyIdProduct,
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
      verifyIdDbMiddleware.verifyIdProduct,
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
    verifyIdDbMiddleware.verifyIdProduct,
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
      sortType: joi.string().allow(null, ''),
      itemsPerPage: joi.string().allow(null, ''),
      page: joi.string().allow(null, '')
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
    verifyIdDbMiddleware.verifyIdProduct,
    productController.listRatingProductController
  )

  router.route('/category/:categoryid/products').get(
    validateDTOMiddleware('params', {
      categoryid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': '"category id" is a required field',
          'string.empty': '"category id" can not be empty',
          'string.pattern.base': '"category id" out of the expected format'
        })
    }),
    validateDTOMiddleware('query', {
      sortType: joi.string().allow(null, ''),
      itemsPerPage: joi.string().allow(null, ''),
      page: joi.string().allow(null, '')
    }),
    verifyIdDbMiddleware.verifyIdCategory,
    productController.listCategoryProductsController
  )
}
