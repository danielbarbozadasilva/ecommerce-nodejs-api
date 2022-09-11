const joi = require('joi')

const validateDTOMiddleware = require('../../utils/middlewares/middlewares.validate-dto')
const verifyIdDbMiddleware = require('../../utils/middlewares/middlewares.verify-exists')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorization = require('../../utils/middlewares/middlewares.authorization')
const clientController = require('../../controllers/controllers.client')

module.exports = (router) => {
  router
    .route('/client')
    .get(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('LIST_CLIENT'),
      clientController.listAllClientsController
    )

  router
    .route('/client/search/:search/solicitations')
    .get(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('SEARCH_SOLICITATION'),
      clientController.searchClientSolicitationController
    )

  router
    .route('/client/search/:search')
    .get(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('SEARCH_CLIENT'),
      clientController.listClientSearchController
    )

  router
    .route('/client/admin/:clientid')
    .get(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('LIST_CLIENT_ID'),
      validateDTOMiddleware('params', {
        clientid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"client id" is a required field',
            'string.empty': '"client id" can not be empty',
            'string.pattern.base': '"client id" out of the expected format'
          })
      }),
      verifyIdDbMiddleware.verifyIdClientDbMiddleware,
      clientController.listByIdClientAdminController
    )
    .put(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('CLIENT_UPDATE'),
      validateDTOMiddleware('params', {
        clientid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"client id" is a required field',
            'string.empty': '"client id" can not be empty',
            'string.pattern.base': '"client id" out of the expected format'
          })
      }),
      validateDTOMiddleware('body', {
        cpf: joi
          .string()
          .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)
          .required()
          .messages({
            'any.required': '"cpf" is a required field',
            'string.empty': '"cpf" can not be empty'
          }),
        name: joi.string().required().messages({
          'any.required': '"name" is a required field',
          'string.empty': '"name" can not be empty'
        }),
        email: joi.string().required().messages({
          'any.required': '"email" is a required field',
          'string.empty': '"email" can not be empty'
        }),
        phones: joi.array().required().messages({
          'any.required': '"phones" is a required field',
          'string.empty': '"phones" can not be empty'
        }),
        birthDate: joi.string().required().messages({
          'any.required': '"birth date" is a required field',
          'string.empty': '"birth date" can not be empty'
        }),
        address: joi.object({
          location: joi.string().required().messages({
            'any.required': '"location" is a required field',
            'string.empty': '"location" can not be empty'
          }),
          number: joi.string().required().messages({
            'any.required': '"number" is a required field',
            'string.empty': '"number" can not be empty'
          }),
          complement: joi.string().required().messages({
            'any.required': '"complement" is a required field',
            'string.empty': '"complement" can not be empty'
          }),
          district: joi.string().required().messages({
            'any.required': '"district" is a required field',
            'string.empty': '"district" can not be empty'
          }),
          city: joi.string().required().messages({
            'any.required': '"city" is a required field',
            'string.empty': '"city" can not be empty'
          }),
          zipCode: joi.string().required().messages({
            'any.required': '"zipCode" is a required field',
            'string.empty': '"zipCode" can not be empty'
          })
        })
      }),
      verifyIdDbMiddleware.verifyIdClientDbMiddleware,
      verifyIdDbMiddleware.verifyEmailUserExists,
      verifyIdDbMiddleware.verifyCpfUserExists,
      clientController.updaterClientAdminController
    )
    .delete(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('CLIENT_DELETE'),
      validateDTOMiddleware('params', {
        clientid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"client id" is a required field',
            'string.empty': '"client id" can not be empty',
            'string.pattern.base': '"client id" out of the expected format'
          })
      }),
      verifyIdDbMiddleware.verifyIdClientDbMiddleware,
      clientController.deleteClientAdminController
    )

  router.route('/client/admin/:clientid/solicitations').get(
    authenticationMiddleware(),
    authorization.authorizationMiddleware('LIST_CLIENT_SOLICITATION'),
    validateDTOMiddleware('params', {
      clientid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': '"client id" is a required field',
          'string.empty': '"client id" can not be empty',
          'string.pattern.base': '"client id" out of the expected format'
        })
    }),
    verifyIdDbMiddleware.verifyIdClientDbMiddleware,
    clientController.listSolicitationController
  )

  router.route('/client/:clientid').get(
    authenticationMiddleware(),
    authorization.authorizationMiddleware('CLIENT_ID'),
    validateDTOMiddleware('params', {
      clientid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': '"client id" is a required field',
          'string.empty': '"client id" can not be empty',
          'string.pattern.base': '"client id" out of the expected format'
        })
    }),
    verifyIdDbMiddleware.verifyIdClientDbMiddleware,
    clientController.listByIdClientController
  )
}
