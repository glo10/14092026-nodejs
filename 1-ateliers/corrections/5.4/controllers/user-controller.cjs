
const Encryption = require('../classes/encryption.cjs')
const Registration = require('../classes/registration.cjs')
const UserRepository = require('../repositories/user-repository.cjs')
const { resolve } = require('node:path')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../entities/user-entity.cjs')

function sign(req, res) {
  const registration = makeRegistration(req.body)
  const isLoginPath = req.url.toLowerCase().endsWith('sign-in')
  const userAction = isLoginPath ? registration.login() : registration.subscribe()
  const status = isLoginPath ? 200 : 201
  userAction
    .then( (response) => {
      const { message } = response
      if(message === 'success') res.status(status).json(response)
      else throw new Error(response)
    })
    .catch(error => {
      res.status(500).json(error.message)
    })
}

function makeRegistration(data) {
  if(!data) {
    throw new Error('email and password required')
  }
  const encryption = new Encryption(bcrypt, jwt, process.env.SECRET)
  const filename = resolve(__dirname, '..', 'data', 'users.json')
  const user = new User(data.email, data.password)
  const userRepository = new UserRepository(user, filename)
  return new Registration(userRepository, encryption)
}


module.exports = {
  sign
}
