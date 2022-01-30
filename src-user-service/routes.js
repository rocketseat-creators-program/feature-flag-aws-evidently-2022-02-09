const Router = require('koa-router')

// middlewares
const error = require('./middlewares/error')

// handlers
const users = require('./handlers/users')
const router = new Router()

router.use(error)

router.get('/users', users.getAllUsers)
router.post('/users', users.createUser)

module.exports = router
