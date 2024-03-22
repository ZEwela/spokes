const { getEndpoints } = require('../controllers/api.controllers')
const usersRouter = require('./users.router')

const apiRouter = require('express').Router()

apiRouter.get('/', getEndpoints)

apiRouter.use('/users', usersRouter)

module.exports = apiRouter