const joi = require('joi')

const validateDTOMiddleware = require('../../utils/middlewares/middlewares.validate-dto')
const verifyIdDbMiddleware = require('../../utils/middlewares/middlewares.verify-exists')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorization = require('../../utils/middlewares/middlewares.authorization')
const categoryController = require('../../controllers/controllers.category')
const fileUpload = require('../../utils/utils.file')

module.exports = (router) => {
  router
    .route('/category')
    .get(categoryController.listAllCategoryController)
    .post(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('CREATE_CATEGORY'),
      validateDTOMiddleware('body', {
        name: joi.string().required().messages({
          'any.required': '"name" is a required field',
          'string.empty': '"name" can not be empty'
        }),
        code: joi.string().required().messages({
          'any.required': '"code" is a required field',
          'string.empty': '"code" can not be empty'
        }),
        photo: joi.string().optional()
      }),
      categoryController.createCategoryController
    )

  router
    .route('/category/availability')
    .get(
      authenticationMiddleware(),
      categoryController.listCategoryAvailabilityController
    )
  router
    .route('/category/:categoryid')
    .get(
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
      verifyIdDbMiddleware.verifyIdCategory,
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
        ),
        photo: joi.string().optional()
      }),
      verifyIdDbMiddleware.verifyIdCategory,
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
      verifyIdDbMiddleware.verifyIdCategory,
      categoryController.deleteCategoryController
    )

  router.route('/category/image/:categoryid').put(
    authenticationMiddleware(),
    authorization.authorizationMiddleware('UPLOAD_IMAGE_PRODUCT'),
    validateDTOMiddleware('params', {
      categoryid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': '"id" is a required field',
          'string.empty': '"id" can not be empty',
          'string.pattern.base': '"id" out of the expected format'
        })
    }),
    verifyIdDbMiddleware.verifyIdCategory,
    fileUpload.array('files', 1),
    categoryController.updateImageCategoryController
  )
}
