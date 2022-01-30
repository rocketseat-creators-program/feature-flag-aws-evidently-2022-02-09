const getUsers = () => [
  { email: 'user1@example.com', name: 'User1' },
  { email: 'user2@example.com', name: 'User2' },
]

const createUser = user => user

module.exports = {
  getUsers,
  createUser,
}
