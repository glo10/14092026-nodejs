export default class TeamRepository {
  constructor(model) {
    this.model = model
  }

  async save(team) {
    return this.model.create(team)
    .catch((err) => console.error('Error insert new team', err))
  }

  async findAll() {
    return this.model.find()
    .then((results) =>{
      return results
    })
    .catch(err => console.error('[ERROR:repository:findAll()]', err))
  }

  async findOne(name) {
    return this.model.find({ name })
    .then((results) => {
      if(results && results.length === 1) return results
      return { message : `Team ${name} does not exist` }
    })
    .catch(err => {
      console.error('[ERROR:repository:findOne()]', err)
      return err.message
    })
  }
}