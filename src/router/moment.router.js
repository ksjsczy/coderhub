const Router = require('koa-router')

const { verifyAuth, verifyPermisson } = require('../middleware/auth.middleware')
const { create, detail, list, update, remove, addLabels, fileInfo } = require('../controller/moment.controller')
const { verifyLabelExists } = require('../middleware/label.middleware')
const momentRouter = new Router({ prefix: '/moment' })

momentRouter.post('/', verifyAuth, create)
momentRouter.get('/:momentId', detail)
momentRouter.get('/', list)
momentRouter.patch('/:momentId', verifyAuth, verifyPermisson, update)
momentRouter.delete('/:momentId', verifyAuth, verifyPermisson, remove)
momentRouter.post('/:momentId/label', verifyAuth, verifyPermisson, verifyLabelExists, addLabels)
momentRouter.get('/images/:fileName', fileInfo)

module.exports = momentRouter