const joi = require('joi')

const validateDTOMiddleware = require('../../utils/middlewares/middlewares.validate-dto')
const verifyIdDbMiddleware = require('../../utils/middlewares/middlewares.verify-exists')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorization = require('../../utils/middlewares/middlewares.authorization')
const categoryController = require('../../controllers/controllers.category')

module.exports = (router) => {
  router
    .route('/category')
    .get(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('LIST_CATEGORY'),
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
      categoryController.listCategoryByStoreController
    )
    .post(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('CREATE_CATEGORY'),
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
        name: joi.string().required().messages({
          'any.required': '"name" is a required field',
          'string.empty': '"name" can not be empty'
        }),
        code: joi.string().required().messages({
          'any.required': '"code" is a required field',
          'string.empty': '"code" can not be empty'
        })
      }),
      verifyIdDbMiddleware.verifyIdStoreDbMiddleware,
      categoryController.createCategoryByStoreController
    )

  router.route('/category/availability').get(
    authenticationMiddleware(),
    authorization.authorizationMiddleware('LIST_CATEGORY_AVAILABILITY'),
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
    categoryController.listCategoryAvailabilityByStoreController
  )
  router
    .route('/category/:categoryid')
    .get(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('LIST_CATEGORY_ID'),
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
      verifyIdDbMiddleware.verifyIdCategoryDbMiddleware,
      verifyIdDbMiddleware.verifyIdStoreDbMiddleware,
      categoryController.listCategoryByIdController
    )
    .put(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('UPDATE_CATEGORY'),
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
      validateDTOMiddleware('body', {
        name: joi.string().required().messages({
          'any.required': '"name" is a required field',
          'string.empty': '"name" can not be empty'
        }),
        code: joi.string().required().messages({
          'any.required': '"code" is a required field',
          'string.empty': '"code" can not be empty'
        }),
        availability: joi.boolean().required().messages({
          'any.required': '"availability" is a required field',
          'string.empty': '"availability" can not be empty'
        }),
        products: joi.array().items(
          joi
            .string()
            .regex(/^[0-9a-fA-F]{24}$/)
            .required()
            .messages({
              'any.required': '"product id" is a required field',
              'string.empty': '"product id" can not be empty',
              'string.pattern.base': '"product id" out of the expected format'
            })
        )
      }),
      verifyIdDbMiddleware.verifyIdCategoryDbMiddleware,
      // verifyIdDbMiddleware.verifyIdProductDbMiddleware,
      categoryController.updateCategoryController
    )
    .delete(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('DELETE_CATEGORY'),
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
      verifyIdDbMiddleware.verifyIdCategoryDbMiddleware,
      categoryController.deleteCategoryController
    )

  router.route('/category/:categoryid/products').get(
    authenticationMiddleware(),
    authorization.authorizationMiddleware('LIST_CATEGORY_PRODUCT'),
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
    verifyIdDbMiddleware.verifyIdCategoryDbMiddleware,
    categoryController.listCategoryByIdController
  )

  router
    .route('/category/:categoryid/products')
    .get(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('LIST_CATEGORY_PRODUCT'),
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
        offset: joi.number(),
        limit: joi.number()
      }),

      verifyIdDbMiddleware.verifyIdCategoryDbMiddleware,
      categoryController.listCategoryWithProductsController
    )
    .put(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('UPDATE_CATEGORY_PRODUCT'),
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
        offset: joi.number(),
        limit: joi.number()
      }),
      validateDTOMiddleware('body', {
        product: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"product id" is a required field',
            'string.empty': '"product id" can not be empty',
            'string.pattern.base': '"product id" out of the expected format'
          })
      }),
      verifyIdDbMiddleware.verifyIdCategoryDbMiddleware,
      // verifyIdDbMiddleware.verifyIdProductDbMiddleware,
      categoryController.updateProductsByIdCategoryController
    )
}
