const joi = require('joi')

const validateDTOMiddleware = require('../../utils/middlewares/middlewares.validate-dto')
const verifyIdDbMiddleware = require('../../utils/middlewares/middlewares.verify-exists')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorization = require('../../utils/middlewares/middlewares.authorization')
const solicitationController = require('../../controllers/controllers.solicitations')

module.exports = (router) => {
  router.route('/solicitation').get(
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
      offset: joi.number(),
      limit: joi.number()
    }),
    verifyIdDbMiddleware.verifyIdStoreDbMiddleware,
    solicitationController.listAllSolicitationController
  )

  router.route('/solicitation/:solicitationid').get(
    validateDTOMiddleware('params', {
      solicitationid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': '"solicitation id" is a required field',
          'string.empty': '"solicitation id" can not be empty',
          'string.pattern.base': '"solicitation id" out of the expected format'
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
      offset: joi.number(),
      limit: joi.number()
    }),
    verifyIdDbMiddleware.verifyIdStoreDbMiddleware,
    solicitationController.listByIdSolicitationController
  )
}
