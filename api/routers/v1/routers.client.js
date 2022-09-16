const joi = require('joi').extend(require('@joi/date'))

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
      validateDTOMiddleware('query', {
        offset: joi.number(),
        limit: joi.number(),
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
      clientController.listAllClientsController
    )
    .post(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('CLIENT_CREATE'),
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
        birthDate: joi.date().format('YYYY-MM-DD').raw().required().messages({
          'any.required': '"birth date" is a required field',
          'string.empty': '"birth date" can not be empty'
        }),
        password: joi.string().required().messages({
          'any.required': '"password" is a required field',
          'string.empty': '"password" can not be empty'
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
          state: joi.string().required().messages({
            'any.required': '"state" is a required field',
            'string.empty': '"state" can not be empty'
          }),
          zipCode: joi.string().required().messages({
            'any.required': '"zipCode" is a required field',
            'string.empty': '"zipCode" can not be empty'
          })
        })
      }),
      verifyIdDbMiddleware.verifyEmailUserExists,
      verifyIdDbMiddleware.verifyCpfUserExists,
      clientController.createClientController
    )

  router.route('/client/search/:search/solicitations').get(
    authenticationMiddleware(),
    authorization.authorizationMiddleware('SEARCH_SOLICITATION'),
    validateDTOMiddleware('query', {
      offset: joi.number(),
      limit: joi.number(),
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
    validateDTOMiddleware('params', {
      search: joi.string().required()
    }),
    clientController.searchClientSolicitationController
  )

  router.route('/client/search/:search').get(
    authenticationMiddleware(),
    authorization.authorizationMiddleware('SEARCH_CLIENT'),
    validateDTOMiddleware('params', {
      search: joi.string().required()
    }),
    validateDTOMiddleware('query', {
      offset: joi.number(),
      limit: joi.number(),
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
    clientController.listClientSearchController
  )

  router.route('/client/:clientid/solicitations').get(
    validateDTOMiddleware('query', {
      offset: joi.number(),
      limit: joi.number(),
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
    authenticationMiddleware(),
    authorization.authorizationMiddleware('LIST_CLIENT_SOLICITATION'),
    verifyIdDbMiddleware.verifyIdClientDbMiddleware,
    clientController.listSolicitationController
  )

  router
    .route('/client/:clientid')
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
          })
      }),
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
      authenticationMiddleware(),
      authorization.authorizationMiddleware('CLIENT_ID'),
      verifyIdDbMiddleware.verifyIdClientDbMiddleware,
      verifyIdDbMiddleware.verifyIdStoreDbMiddleware,
      clientController.listByIdClientController
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
        birthDate: joi.date().format('YYYY-MM-DD').raw().required().messages({
          'any.required': '"birth date" is a required field',
          'string.empty': '"birth date" can not be empty'
        }),
        password: joi.string().required().messages({
          'any.required': '"password" is a required field',
          'string.empty': '"password" can not be empty'
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
          state: joi.string().required().messages({
            'any.required': '"state" is a required field',
            'string.empty': '"state" can not be empty'
          }),
          zipCode: joi.string().required().messages({
            'any.required': '"zipCode" is a required field',
            'string.empty': '"zipCode" can not be empty'
          })
        })
      }),
      verifyIdDbMiddleware.verifyIdClientDbMiddleware,
      verifyIdDbMiddleware.verifyIdStoreDbMiddleware,
      verifyIdDbMiddleware.verifyEmailUserExists,
      verifyIdDbMiddleware.verifyCpfUserExists,
      clientController.updaterClientController
    )
    .delete(
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
      authenticationMiddleware(),
      authorization.authorizationMiddleware('CLIENT_DELETE'),
      verifyIdDbMiddleware.verifyIdClientDbMiddleware,
      clientController.deleteClientController
    )
}
