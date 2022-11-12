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
      ratingController.listRatingProductController
    )
    .post(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('CREATE_RATING'),
      validateDTOMiddleware('query', {
        clientid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"client id" is a required field',
            'string.empty': '"client id" can not be empty',
            'string.pattern.base': '"client id" out of the expected format'
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
        score: joi.number().min(1).max(5).required().messages({
          'any.required': '"score" is a required field',
          'string.empty': '"score" can not be empty'
        })
      }),
      verifyIdDbMiddleware.verifyIdClient,
      verifyIdDbMiddleware.verifyIdProduct,
      verifyIdDbMiddleware.verifyRatingExistsMiddleware,
      ratingController.createRatingProductController
    )
    .delete(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('DELETE_RATING'),
      validateDTOMiddleware('query', {
        clientid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"client id" is a required field',
            'string.empty': '"client id" can not be empty',
            'string.pattern.base': '"client id" out of the expected format'
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
      verifyIdDbMiddleware.verifyIdClient,
      verifyIdDbMiddleware.verifyIdProduct,
      verifyIdDbMiddleware.verifyRatingNotExistsMiddleware,
      ratingController.deleteRatingProductController
    )
  router.route('/rating/:ratingid').get(
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
    verifyIdDbMiddleware.verifyIdRating,
    ratingController.listByIdRatingProductController
  )
}
