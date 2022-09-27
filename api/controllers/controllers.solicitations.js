const solicitationService = require('../services/services.solicitation')

const listAllSolicitationController = async (req, res) => {
  const { offset, limit, storeid } = req.query

  const resultService = await solicitationService.listAllSolicitationService(
    offset,
    limit,
    storeid
  )
  const code = resultService.success ? 200 : 400
  const message = resultService.success
    ? { message: resultService.message }
    : { details: resultService.details }
  const data = resultService.data ? resultService.data : ''
  return res.status(code).send({ message, data })
}

module.exports = {
  listAllSolicitationController
}
