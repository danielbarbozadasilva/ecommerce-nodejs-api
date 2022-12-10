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
        limit: joi.number()
      }),
      clientController.listAllClientsController
    )
    .post(
      validateDTOMiddleware('body', {
        cpf: joi.string().required().messages({
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
        password: joi.string().required().messages({
          'any.required': '"password" is a required field',
          'string.empty': '"password" can not be empty'
        }),
        address: joi.object({
          street: joi.string().required().messages({
            'any.required': '"street" is a required field',
            'string.empty': '"street" can not be empty'
          }),
          number: joi.string().required().messages({
            'any.required': '"number" is a required field',
            'string.empty': '"number" can not be empty'
          }),
          complement: joi.string().optional(),
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
      limit: joi.number()
    }),
    validateDTOMiddleware('params', {
      search: joi.string().required()
    }),
    clientController.searchClientSolicitationController
  )

  router.route('/client/search/:search').get(
    authenticationMiddleware(),
    authorization.authorizationMiddleware('SEARCH_CLIENT'),
    validateDTOMiddleware('query', {
      offset: joi.number(),
      limit: joi.number()
    }),
    validateDTOMiddleware('params', {
      search: joi.string().required()
    }),
    clientController.listClientSearchController
  )

  router.route('/client/:clientid/solicitations').get(
    validateDTOMiddleware('query', {
      offset: joi.number(),
      limit: joi.number()
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
    verifyIdDbMiddleware.verifyIdClient,
    clientController.listSolicitationClientController
  )

  router.route('/client/:clientid/like').get(
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
    authorization.authorizationMiddleware('LIST_LIKE'),
    verifyIdDbMiddleware.verifyIdClient,
    clientController.listClientLikeProductController
  )

  router.route('/client/:clientid/product/:productid/like').post(
    validateDTOMiddleware('params', {
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
    authenticationMiddleware(),
    authorization.authorizationMiddleware('CLIENT_CREATE_LIKE'),
    verifyIdDbMiddleware.verifyIdClient,
    verifyIdDbMiddleware.verifyIdProduct,
    clientController.createLikeProductController
  )

  router.route('/client/:clientid/product/:productid/like').delete(
    validateDTOMiddleware('params', {
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
    authenticationMiddleware(),
    authorization.authorizationMiddleware('CLIENT_DELETE_LIKE'),
    verifyIdDbMiddleware.verifyIdClient,
    verifyIdDbMiddleware.verifyIdProduct,
    clientController.removeLikeProductController
  )

  router
    .route('/client/:clientid')
    .get(
      validateDTOMiddleware('query', {
        offset: joi.number(),
        limit: joi.number()
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
      verifyIdDbMiddleware.verifyIdClient,
      clientController.listByIdClientController
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
      verifyIdDbMiddleware.verifyIdClient,
      clientController.deleteClientController
    )
  router.route('/client/:clientid/user/:userid').put(
    validateDTOMiddleware('params', {
      userid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': '"user id" is a required field',
          'string.empty': '"user id" can not be empty',
          'string.pattern.base': '"user id" out of the expected format'
        }),
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
      cpf: joi.string().required().messages({
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
        street: joi.string().required().messages({
          'any.required': '"street" is a required field',
          'string.empty': '"street" can not be empty'
        }),
        number: joi.string().required().messages({
          'any.required': '"number" is a required field',
          'string.empty': '"number" can not be empty'
        }),
        complement: joi.string().optional(),
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
    authenticationMiddleware(),
    authorization.authorizationMiddleware('CLIENT_UPDATE'),
    verifyIdDbMiddleware.verifyIdClient,
    verifyIdDbMiddleware.verifyEmailUserExists,
    verifyIdDbMiddleware.verifyCpfUserExists,
    clientController.updaterClientController
  )
}
