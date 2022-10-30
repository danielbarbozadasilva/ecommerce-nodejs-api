const joi = require('joi')

const validateDTOMiddleware = require('../../utils/middlewares/middlewares.validate-dto')
const verifyIdDbMiddleware = require('../../utils/middlewares/middlewares.verify-exists')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorization = require('../../utils/middlewares/middlewares.authorization')
const paymentController = require('../../controllers/controllers.payment')

module.exports = (router) => {
  if (process.env.NODE_ENV !== 'production') {
    router.get('/payment/token')
  }

  router
    .route('/payment/:paymentid')
    .get(
      authenticationMiddleware(),
      // authorization.authorizationMiddleware('LIST_PAYMENT_ID'),
      validateDTOMiddleware('params', {
        paymentid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"payment id" is a required field',
            'string.empty': '"payment id" can not be empty',
            'string.pattern.base': '"payment id" out of the expected format'
          })
      }),
      verifyIdDbMiddleware.verifyIdPaymentDbMiddleware,
      paymentController.listByIdPaymentController
    )
    .put(
      authenticationMiddleware(),
      //   authorization.authorizationMiddleware('UPDATE_PAYMENT'),
      validateDTOMiddleware('params', {
        paymentid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"payment id" is a required field',
            'string.empty': '"payment id" can not be empty',
            'string.pattern.base': '"payment id" out of the expected format'
          })
      }),
      validateDTOMiddleware('body', {
        status: joi.boolean().required().messages({
          'any.required': '"status" is a required field',
          'boolean.empty': '"status" can not be empty'
        })
      }),
      verifyIdDbMiddleware.verifyIdPaymentDbMiddleware,
      paymentController.updatePaymentController
    )

  router.route('/take/payment/:paymentid').post(
    authenticationMiddleware(),
    //   authorization.authorizationMiddleware('TAKE_PAYMENT'),
    validateDTOMiddleware('params', {
      paymentid: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': '"payment id" is a required field',
          'string.empty': '"payment id" can not be empty',
          'string.pattern.base': '"payment id" out of the expected format'
        })
    }),
    validateDTOMiddleware('body', {
      senderHash: joi.string().required().messages({
        'any.required': '"senderHash" is a required field',
        'string.empty': '"senderHash" can not be empty'
      })
    }),
    verifyIdDbMiddleware.verifyIdPaymentDbMiddleware,
    paymentController.createPaymentController
  )

  router.route('/payment/notification').post(
    authenticationMiddleware(),
    //   authorization.authorizationMiddleware('NOTIFICATION_PAYMENT'),
    validateDTOMiddleware('body', {
      notificationCode: joi.string().required().messages({
        'any.required': '"notificationCode" is a required field',
        'string.empty': '"notificationCode" can not be empty'
      }),
      notificationType: joi.string().required().messages({
        'any.required': '"notificationType" is a required field',
        'string.empty': '"notificationType" can not be empty'
      })
    }),
    paymentController.showNotificationPaymentController
  )

  router.route('/payment/session').get(
    authenticationMiddleware(),
    //   authorization.authorizationMiddleware('SESSION_PAYMENT'),
    paymentController.showSessionPaymentController
  )
}
