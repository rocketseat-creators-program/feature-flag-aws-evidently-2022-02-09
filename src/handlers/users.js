const userService = require('../services/user')

const getAllUsers = async ctx => {
  ctx.body = await userService.getUsers(ctx.state.id)
}

const createUser = async ctx => {
  ctx.body = await userService.createUser(ctx.request.body)
}

module.exports = {
  getAllUsers,
  createUser,
}
