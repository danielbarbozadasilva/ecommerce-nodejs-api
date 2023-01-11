const joi = require('joi')
const userController = require('../../controllers/controllers.user')
const validateDTOMiddleware = require('../../utils/middlewares/middlewares.validate-dto')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const {
  authorizationMiddleware
} = require('../../utils/middlewares/middlewares.authorization')
const verifyIdDbMiddleware = require('../../utils/middlewares/middlewares.verify-exists')

module.exports = (router) => {
  router.route('/auth').post(
    validateDTOMiddleware('body', {
      email: joi.string().required().messages({
        'any.required': `"email" is a required field`,
        'string.empty': `"email" can not be empty`
      }),
      password: joi.string().required().messages({
        'any.required': `"password" is a required field`,
        'string.empty': `"password" can not be empty`
      })
    }),
    userController.authController
  )

  router.route('/check-token').post(
    validateDTOMiddleware('body', {
      token: joi.string().required().messages({
        'any.required': `"token" is a required field`,
        'string.empty': `"token" can not be empty`
      })
    }),
    userController.checkTokenController
  )

  router.route('/refresh-token').post(userController.refreshTokenController)

  router
    .route('/user/:userid')
    .get(
      authenticationMiddleware(),
      authorizationMiddleware('USER_LIST_ID'),
      validateDTOMiddleware('params', {
        userid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"user id" is a required field',
            'string.empty': '"user id" can not be empty',
            'string.pattern.base': '"user id" out of the expected format'
          })
      }),
      verifyIdDbMiddleware.verifyIdUser,
      userController.listByIdUserController
    )
    .put(
      authenticationMiddleware(),
      authorizationMiddleware('USER_UPDATE'),
      validateDTOMiddleware('params', {
        userid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"user id" is a required field',
            'string.empty': '"user id" can not be empty',
            'string.pattern.base': '"user id" out of the expected format'
          })
      }),
      validateDTOMiddleware('body', {
        name: joi.string().required().messages({
          'any.required': '"name" is a required field',
          'string.empty': '"name" can not be empty'
        }),
        email: joi.string().required().messages({
          'any.required': '"email" is a required field',
          'string.empty': '"email" can not be empty'
        }),
        password: joi.string().required().messages({
          'any.required': '"password" is a required field',
          'string.empty': '"password" can not be empty'
        })
      }),
      verifyIdDbMiddleware.verifyEmailUserExists,
      verifyIdDbMiddleware.verifyIdUser,
      userController.updateUserController
    )
    .delete(
      authenticationMiddleware(),
      authorizationMiddleware('USER_DELETE'),
      validateDTOMiddleware('params', {
        userid: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"user id" is a required field',
            'string.empty': '"user id" can not be empty',
            'string.pattern.base': '"user id" out of the expected format'
          })
      }),
      verifyIdDbMiddleware.verifyIdUser,
      userController.deleteUserController
    )

  router.route('/user/recovery/password-recovery').put(
    validateDTOMiddleware('body', {
      email: joi.string().required().messages({
        'any.required': '"email" is a required field',
        'string.empty': '"email" can not be empty'
      })
    }),
    verifyIdDbMiddleware.verifyEmail,
    userController.sendTokenRecoveryPasswordController
  )

  router.route('/user/recovery/reset-password').put(
    validateDTOMiddleware('body', {
      email: joi.string().required().messages({
        'any.required': '"email" is a required field',
        'string.empty': '"email" can not be empty'
      }),
      token: joi.string().required().messages({
        'any.required': '"token" is a required field',
        'string.empty': '"token" can not be empty'
      }),
      newPassword: joi.string().required().messages({
        'any.required': `"password" is a required field`,
        'string.empty': `"password" can not be empty`
      })
    }),
    verifyIdDbMiddleware.verifyEmail,
    userController.resetPasswordController
  )
}
