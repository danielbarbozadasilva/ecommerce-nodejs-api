const clientController = require('../../controllers/controllers.client')
const authenticationMiddleware = require('../../utils/middlewares/middlewares.authentication')
const authorization = require('../../utils/middlewares/middlewares.authorization')

module.exports = (router) => {
  router
    .route('/client')
    .get(
      authenticationMiddleware(),
      authorization.authorizationMiddleware(),
      clientController.listAllClientsController
    )

  router
    .route('/client/search/:search/solicitations')
    .get(
      authenticationMiddleware(),
      authorization.authorizationMiddleware(),
      clientController.listClientSolicitationController
    )

  router
    .route('/client/search/:search')
    .get(
      authenticationMiddleware(),
      authorization.authorizationMiddleware(),
      clientController.listClientSearchController
    )
}
