const joi = require('joi').extend(require('@joi/date'))

const validateDTOMiddleware = require('../../middlewares/middlewares.validate-dto')
const verifyIdDbMiddleware = require('../../middlewares/middlewares.verify-exists')
const solicitationController = require('../../controllers/controllers.solicitations')
const authenticationMiddleware = require('../../middlewares/middlewares.authentication')
const authorization = require('../../middlewares/middlewares.authorization')

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
              price: joi.number().required().messages({
                'any.required': '"price" is a required field',
                'number.empty': '"price" can not be empty'
              }),
              quantity: joi.number().required().messages({
                'any.required': '"quantity" is a required field',
                'number.empty': '"quantity" can not be empty'
              }),
              title: joi.string().optional(),
              photos: joi.array().optional(),
              shipping: joi.string().optional()
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
            address: joi.object({
              street: joi.string().optional(),
              number: joi.string().optional(),
              complement: joi.string().optional(),
              district: joi.string().optional(),
              city: joi.string().optional(),
              state: joi.string().optional(),
              zipCode: joi.string().optional()
            }),

            card: joi.object({
              fullName: joi.string().optional(),
              areaCode: joi.string().optional(),
              phone: joi.string().optional(),
              birthDate: joi.date().optional(),
              creditCardToken: joi.string().optional(),
              cpf: joi.string().optional()
            })
          })
          .required(),
        deliveries: joi
          .object({
            price: joi.number().required().messages({
              'any.required': '"price" is a required field',
              'number.empty': '"price" can not be empty'
            }),
            type: joi.number().required().messages({
              'any.required': '"type" is a required field',
              'number.empty': '"type" can not be empty'
            }),
            deliveryTime: joi.number().required().messages({
              'any.required': '"deliveryTime" is a required field',
              'number.empty': '"deliveryTime" can not be empty'
            }),
            address: joi
              .object({
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
              .required()
          })
          .required()
      }),
      verifyIdDbMiddleware.verifyCpfUserExists,
      solicitationController.createSolicitationController
    )

  router
    .route('/solicitation/:solicitationNumber')
    .get(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('LIST_ID_SOLICITATION'),
      validateDTOMiddleware('params', {
        solicitationNumber: joi.string().required().messages({
          'any.required': '"solicitationNumber" is a required field',
          'string.empty': '"solicitationNumber" can not be empty'
        })
      }),
      verifyIdDbMiddleware.verifyIdSolicitation,
      solicitationController.listByNumberSolicitationController
    )
    .delete(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('SOLICITATION_DELETE'),
      validateDTOMiddleware('params', {
        solicitationNumber: joi.string().required().messages({
          'any.required': '"solicitationNumber" is a required field',
          'string.empty': '"solicitationNumber" can not be empty'
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
      verifyIdDbMiddleware.verifyIdSolicitation,
      verifyIdDbMiddleware.verifyIsAlreadyCanceledSolicitation,
      verifyIdDbMiddleware.verifyIdClient,
      solicitationController.deleteSolicitationController
    )

  router.route('/solicitation/:solicitationNumber/cart').get(
    authenticationMiddleware(),
    authorization.authorizationMiddleware('LIST_CART_PRODUCT'),
    validateDTOMiddleware('params', {
      solicitationNumber: joi.string().required().messages({
        'any.required': '"solicitationNumber" is a required field',
        'string.empty': '"solicitationNumber" can not be empty'
      })
    }),
    verifyIdDbMiddleware.verifyIdSolicitation,
    solicitationController.showCartSolicitationController
  )
}
