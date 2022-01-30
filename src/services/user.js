const Evidently = require('aws-sdk/clients/evidently')
const R = require('ramda')
const axios = require('axios')
const { performance } = require('perf_hooks')

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
  const evaluationResult = await evidently.evaluateFeature(evaluateFeatureRequest).promise()
  const isFeatureEnabled = evaluationResult.value.boolValue

  let users = []
  const startTime = performance.now()

  if (isFeatureEnabled) {
    users = await axios.get('http://127.0.0.1:3001/users').then(response => response.data)
  } else {
    users = await User
      .findAll({})
      .then(serializeUsers)
  }

  await evidently.putProjectEvents({
    project: 'aula-1',
    events: [
      {
        timestamp: new Date(),
        type: 'aws.evidently.custom',
        data: { details: { loadTime: performance.now() - startTime }, userDetails: { userId: `${userId}` } },
      },
    ],
  }).promise()

  return users
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
