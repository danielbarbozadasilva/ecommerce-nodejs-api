const joi = require('joi')

const validateDTOMiddleware = require('../../utils/middlewares/middlewares.validate-dto')
const verifyIdDbMiddleware = require('../../utils/middlewares/middlewares.verify-exists')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorization = require('../../utils/middlewares/middlewares.authorization')
const ratingController = require('../../controllers/controllers.rating')

module.exports = (router) => {
  router
    .route('/rating')
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
      ratingController.listRatingProductController
    )
    .post(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('CREATE_RATING'),
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
        name: joi.string().required().messages({
          'any.required': '"name" is a required field',
          'string.empty': '"name" can not be empty'
        }),
        text: joi.string().required().messages({
          'any.required': '"text" is a required field',
          'string.empty': '"text" can not be empty'
        }),
        score: joi
          .string()
          .regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/)
          .required()
          .messages({
            'any.required': '"score" is a required field',
            'string.empty': '"score" can not be empty',
            'string.pattern.base': '"score" out of the expected format'
          })
      }),
      verifyIdDbMiddleware.verifyIdStoreDbMiddleware,
      verifyIdDbMiddleware.verifyIdProductDbMiddleware,
      ratingController.createRatingProductController
    )

  router
    .route('/rating/:ratingid')
    .get(
      validateDTOMiddleware('params', {
        ratingid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"rating id" is a required field',
            'string.empty': '"rating id" can not be empty',
            'string.pattern.base': '"rating id" out of the expected format'
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
      verifyIdDbMiddleware.verifyIdStoreDbMiddleware,
      verifyIdDbMiddleware.verifyIdProductDbMiddleware,
      verifyIdDbMiddleware.verifyIdRatingDbMiddleware,
      ratingController.listByIdRatingProductController
    )
    .delete(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('DELETE_RATING'),
      validateDTOMiddleware('params', {
        ratingid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"rating id" is a required field',
            'string.empty': '"rating id" can not be empty',
            'string.pattern.base': '"rating id" out of the expected format'
          })
      }),
      verifyIdDbMiddleware.verifyIdRatingDbMiddleware,
      ratingController.deleteRatingProductController
    )
}
