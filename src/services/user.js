const Evidently = require('aws-sdk/clients/evidently')
const R = require('ramda')
const axios = require('axios')

const crypto = require('./crypto')
const { User } = require('../models')

const evidently = new Evidently({ region: 'us-east-1' })

const serializeUsers = users =>
  users
    .map(user => user.get({ plain: true }))
    .map(R.omit(['password']))

const getUsers = async userId => {
  const evaluateFeatureRequest = {
    entityId: `${userId}`,
    feature: 'user-service',
    project: 'aula-1',
  }

  const evaluationResult = await evidently
    .evaluateFeature(evaluateFeatureRequest)
    .promise()

  const isFeatureEnabled = evaluationResult.value.boolValue
  console.log(evaluationResult)

  if (isFeatureEnabled) {
    return axios.get('http://127.0.0.1:3001/users')
      .then(response => response.data)
  }

  return User
    .findAll({})
    .then(serializeUsers)
}

const createUser = user =>
  crypto
    .hash(user.password)
    .then(hash => User.create({
      ...user,
      password: hash,
    }))

const findByEmail = email =>
  User.findOne({ where: { email } })

module.exports = {
  getUsers,
  createUser,
  findByEmail,
}

