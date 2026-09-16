const { readFile, writeFile } = require('node:fs/promises')

class UserRepository {
  constructor(user, filename) {
    this.user = user
    this.filename = filename
  }
  
  async insert() {
    if (!(this.user.email && this.user.password)) {
      throw new Error('Email and password are required')
    }
    return this.findAll()
    .then((users) => {
      if (this.findOne(users)) {
        return { message: 'Impossible to create a new account for the moment' }
      } else {
        users.push(this.user)
        return this.rewrite(users, this.filename)
      }
    })
    .catch(error => error)
  }

  findOne(users) {
    if (users) {
      return users.find((u) => u.email === this.user.email)
    }
    return null
  }

  async findAll() {
    // idéalement ici vérifier que le fichier existe et qu'il est vide plutôt
    const usersReader = readFile(this.filename, { encoding: 'utf8' })
    return usersReader
      .then((users) => JSON.parse(users))
      .catch((err) => {
        if(err.message.match(/unexpected.+JSON.+/i)) {
          return []
        }
        throw new Error(err.message)
      })
  }

  async rewrite(users) {
    return writeFile(this.filename, JSON.stringify(users))
      .then(() => { message: 'success' })
      .catch(error => error )
  }
}
module.exports = UserRepository
