const clientController = require('../../controllers/controllers.client')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorization = require('../../utils/middlewares/middlewares.authorization')

module.exports = (router) => {
  router
    .route('/client')
    .get(
      authenticationMiddleware(),
      authorization.verifyUserBelongsStore(),
      clientController.listAllClientsController
    )

  router
    .route('/client/search/:search/solicitations')
    .get(
      authenticationMiddleware(),
      authorization.verifyUserBelongsStore(),
      clientController.listClientSolicitationController
    )
}
