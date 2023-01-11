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
      fileUpload.array('files', 1),
      categoryController.createCategoryController
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
      fileUpload.array('files', 1),
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
}
