const joi = require('joi').extend(require('@joi/date'))

const validateDTOMiddleware = require('../../utils/middlewares/middlewares.validate-dto')
const verifyIdDbMiddleware = require('../../utils/middlewares/middlewares.verify-exists')
const solicitationController = require('../../controllers/controllers.solicitations')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorization = require('../../utils/middlewares/middlewares.authorization')

module.exports = (router) => {
  router
    .route('/solicitation')
    .get(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('LIST_ALL_SOLICITATION'),
      validateDTOMiddleware('query', {
        offset: joi.number(),
        limit: joi.number()
      }),
      solicitationController.listAllSolicitationController
    )
    .post(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('SOLICITATION_CREATE'),
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
        cart: joi
          .array()
          .items(
            joi.object({
              product: joi
                .string()
                .regex(/^[0-9a-fA-F]{24}$/)
                .required()
                .messages({
                  'any.required': '"product id" is a required field',
                  'string.empty': '"product id" can not be empty',
                  'string.pattern.base':
                    '"product id" out of the expected format'
                }),
              unitPrice: joi.number().required().messages({
                'any.required': '"unit price" is a required field',
                'number.empty': '"unit price" can not be empty'
              }),
              quantity: joi.number().required().messages({
                'any.required': '"quantity" is a required field',
                'number.empty': '"quantity" can not be empty'
              })
            })
          )
          .required(),
        zipCode: joi.string().required().messages({
          'any.required': '"shipping" is a required field',
          'string.empty': '"shipping" can not be empty'
        }),
        shipping: joi.number().required().messages({
          'any.required': '"shipping" is a required field',
          'number.empty': '"shipping" can not be empty'
        }),
        payment: joi
          .object({
            price: joi.number().required().messages({
              'any.required': '"price" is a required field',
              'number.empty': '"price" can not be empty'
            }),
            type: joi.string().required().messages({
              'any.required': '"type" is a required field',
              'string.empty': '"type" can not be empty'
            }),
            installments: joi.number().optional(),
            addressDeliveryIgualCharging: joi.boolean().required().messages({
              'any.required':
                '"addressDeliveryIgualCharging" is a required field',
              'boolean.empty': '"addressDeliveryIgualCharging" can not be empty'
            }),
            address: joi
              .object({
                location: joi.string().required().messages({
                  'any.required': '"location" is a required field',
                  'string.empty': '"location" can not be empty'
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
              .required(),
            card: joi
              .object({
                fullName: joi.string().required().messages({
                  'any.required': '"fullName" is a required field',
                  'string.empty': '"fullName" can not be empty'
                }),
                areaCode: joi.string().required().messages({
                  'any.required': '"areaCode" is a required field',
                  'string.empty': '"areaCode" can not be empty'
                }),
                phone: joi.string().required().messages({
                  'any.required': '"phone" is a required field',
                  'string.empty': '"phone" can not be empty'
                }),
                birthDate: joi.date().format('YYYY-MM-DD').required().messages({
                  'any.required': '"birth date" is a required field',
                  'date.empty': '"birth date" can not be empty'
                }),
                creditCardToken: joi.string().required().messages({
                  'any.required': '"creditCardToken" is a required field',
                  'string.empty': '"creditCardToken" can not be empty'
                }),
                cpf: joi
                  .string()
                  .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)
                  .required()
                  .messages({
                    'any.required': '"cpf" is a required field',
                    'string.empty': '"cpf" can not be empty'
                  })
              })
              .optional()
          })
          .required(),
        deliveries: joi
          .object({
            price: joi.number().required().messages({
              'any.required': '"price" is a required field',
              'number.empty': '"price" can not be empty'
            }),
            type: joi.string().required().messages({
              'any.required': '"type" is a required field',
              'string.empty': '"type" can not be empty'
            }),
            deliveryTime: joi.number().required().messages({
              'any.required': '"deliveryTime" is a required field',
              'number.empty': '"deliveryTime" can not be empty'
            }),
            address: joi
              .object({
                location: joi.string().required().messages({
                  'any.required': '"location" is a required field',
                  'string.empty': '"location" can not be empty'
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
              .required()
          })
          .required()
      }),
      verifyIdDbMiddleware.verifyCpfUserExists,
      solicitationController.createSolicitationController
    )

  router
    .route('/solicitation/:solicitationid')
    .get(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('LIST_ID_SOLICITATION'),
      validateDTOMiddleware('params', {
        solicitationid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"solicitation id" is a required field',
            'string.empty': '"solicitation id" can not be empty',
            'string.pattern.base':
              '"solicitation id" out of the expected format'
          })
      }),
      validateDTOMiddleware('query', {
        offset: joi.number(),
        limit: joi.number()
      }),
      verifyIdDbMiddleware.verifyIdSolicitationDbMiddleware,
      solicitationController.listByIdSolicitationController
    )
    .delete(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('SOLICITATION_DELETE'),
      validateDTOMiddleware('params', {
        solicitationid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"solicitation id" is a required field',
            'string.empty': '"solicitation id" can not be empty',
            'string.pattern.base':
              '"solicitation id" out of the expected format'
          })
      }),
      validateDTOMiddleware('query', {
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
      verifyIdDbMiddleware.verifyIdSolicitationDbMiddleware,
      verifyIdDbMiddleware.verifyIdClientDbMiddleware,
      solicitationController.deleteSolicitationController
    )

  router.route('/solicitation/:solicitationid/cart').get(
    authenticationMiddleware(),
    authorization.authorizationMiddleware('LIST_CART_PRODUCT'),
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
      offset: joi.number(),
      limit: joi.number()
    }),
    verifyIdDbMiddleware.verifyIdSolicitationDbMiddleware,
    solicitationController.showCartSolicitationController
  )
}
