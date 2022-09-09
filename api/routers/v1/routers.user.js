const joi = require('joi')
const userController = require('../../controllers/controllers.user')
const validateDTOMiddleware = require('../../utils/middlewares/middlewares.validate-dto')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorizationMiddleware = require('../../utils/middlewares/middlewares.authorization')
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

  router.route('/register').post(
    validateDTOMiddleware('body', {
      name: joi.string().required().messages({
        'any.required': `"name" is a required field`,
        'string.empty': `"name" can not be empty`
      }),
      email: joi.string().required().messages({
        'any.required': `"email" is a required field`,
        'string.empty': `"email" can not be empty`
      }),
      password: joi.string().required().messages({
        'any.required': `"password" is a required field`,
        'string.empty': `"password" can not be empty`
      }),
      store: joi
        .string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
          'any.required': '"store id" is a required field',
          'string.empty': '"store id" can not be empty',
          'string.pattern.base': '"store id" out of the expected format'
        })
    }),
    verifyIdDbMiddleware.verifyEmailExists,
    userController.registerController
  )

  router
    .route('/user')
    .get(
      authenticationMiddleware(),
      authorizationMiddleware('USER_LIST_ALL'),
      userController.listAllUsersController
    )

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
      verifyIdDbMiddleware.verifyIdUserDbMiddleware,
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
        }),
        store: joi
          .string()
          .regex(/^[0-9a-fA-F]{24}$/)
          .required()
          .messages({
            'any.required': '"store id" is a required field',
            'string.empty': '"store id" can not be empty',
            'string.pattern.base': '"store id" out of the expected format'
          })
      }),
      verifyIdDbMiddleware.verifyEmailExists,
      verifyIdDbMiddleware.verifyIdUserDbMiddleware,
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
      verifyIdDbMiddleware.verifyIdUserDbMiddleware,
      userController.deleteUserController
    )
}
