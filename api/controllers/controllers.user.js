const userService = require('../services/services.user')

const authController = async (req, res) => {
  const { email, password } = req.body
  const resultService = await userService.authService(email, password)
  const code = resultService.success ? 200 : 401
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const checkTokenController = async (req, res) => {
  const { token } = req.body
  const resultService = await userService.checkTokenService(token)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const refreshTokenController = async (req, res) => {
  const { token } = req.body
  const resultService = await userService.refreshTokenService(token)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const registerController = async (req, res) => {
  const { body } = req
  const resultService = await userService.registerService(body)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const listByIdUserController = async (req, res) => {
  const { userid } = req.params
  const resultService = await userService.listByIdUserService(userid)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const updateUserController = async (req, res) => {
  const { body } = req
  const { userid } = req.params
  const resultService = await userService.updateUserService(userid, body)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const deleteUserController = async (req, res) => {
  const { userid } = req.params
  const resultService = await userService.deleteUserService(userid)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const sendTokenRecoveryPasswordController = async (req, res) => {
  const { body } = req
  const resultService = await userService.sendTokenRecoveryPasswordService(body)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

const resetPasswordController = async (req, res) => {
  const { body } = req
  const resultService = await userService.resetPasswordUserService(body)
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

module.exports = {
  authController,
  refreshTokenController,
  registerController,
  listByIdUserController,
  updateUserController,
  deleteUserController,
  sendTokenRecoveryPasswordController,
  resetPasswordController,
  checkTokenController
}
