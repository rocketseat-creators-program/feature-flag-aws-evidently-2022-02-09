const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const router = require('./routes')

const app = new Koa()

app.use(bodyParser())
app.use(router.routes())

const port = 3001

app.listen(port)
  .on('listening', () => console.log(`Listening on port ${port}`))
