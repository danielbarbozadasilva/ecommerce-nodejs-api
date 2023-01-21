const joi = require('joi')

const validateDTOMiddleware = require('../../middlewares/middlewares.validate-dto')
const verifyIdDbMiddleware = require('../../middlewares/middlewares.verify-exists')
const authenticationMiddleware = require('../../middlewares/middlewares.authentication')
const authorization = require('../../middlewares/middlewares.authorization')
const deliveryController = require('../../controllers/controllers.delivery')

module.exports = (router) => {
  router
    .route('/delivery/:deliveryid')
    .get(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('LIST_DELIVERY'),
      validateDTOMiddleware('params', {
        deliveryid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"delivery id" is a required field',
            'string.empty': '"delivery id" can not be empty',
            'string.pattern.base': '"delivery id" out of the expected format'
          })
      }),
      verifyIdDbMiddleware.verifyIdDelivery,
      deliveryController.listByIdDeliveryController
    )
    .put(
      authenticationMiddleware(),
      authorization.authorizationMiddleware('UPDATE_DELIVERY'),
      validateDTOMiddleware('params', {
        deliveryid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"delivery id" is a required field',
            'string.empty': '"delivery id" can not be empty',
            'string.pattern.base': '"delivery id" out of the expected format'
          })
      }),
      validateDTOMiddleware('body', {
        status: joi.string().required().messages({
          'any.required': '"status" is a required field',
          'string.empty': '"status" can not be empty'
        }),
        trackingCode: joi.string().required().messages({
          'any.required': '"trackingCode" is a required field',
          'string.empty': '"trackingCode" can not be empty'
        })
      }),
      verifyIdDbMiddleware.verifyIdDelivery,
      deliveryController.updateDeliveryController
    )

  router.route('/delivery/calculate').post(
    validateDTOMiddleware('body', {
      cart: joi
        .array()
        .items(
          joi.object({
            photos: joi.array().items(joi.string()).optional(),
            price: joi.number().required().messages({
              'any.required': '"price" is a required field',
              'number.empty': '"price" can not be empty'
            }),
            product: joi
              .string()
              .regex(/^[0-9a-fA-F]{24}$/)
              .required()
              .messages({
                'any.required': '"product id" is a required field',
                'string.empty': '"product id" can not be empty',
                'string.pattern.base': '"product id" out of the expected format'
              }),
            quantity: joi.number().required().messages({
              'any.required': '"quantity" is a required field',
              'number.empty': '"quantity" can not be empty'
            }),
            title: joi.string().required().messages({
              'any.required': '"title" is a required field',
              'string.empty': '"title" can not be empty'
            })
          })
        )
        .required(),
      zipCode: joi.string().required().messages({
        'any.required': '"zipCode" is a required field',
        'string.empty': '"zipCode" can not be empty'
      })
    }),

    deliveryController.calculateShippingController
  )
}
