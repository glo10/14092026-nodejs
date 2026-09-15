const { readFile } = require('fs/promises')
const { join } = require('path')
const jsonFile = join(__dirname, '../public', 'data', 'news.json')

// Un middleware, on verra en détails un peu plus tard
const checkID = (req, res, next) => {
  const id = req.params.id
  // test si id est numérique
  if (req.params.id && !/\d+/.test(req.params.id)) {
    res.status(400)
    throw new Error(`${id} must be a number`)
  }
  next()
}

const findAll = (_, res) => {
  getContent(jsonFile)
  .then(({ articles, title }) => { // décomposition idem que .then((data) => { const articles = data.articles; const title = data.title})
    res.render('news/list',{ articles, title })
  }).catch(error => res.render('error', { message : error.message}))
}

const findOne = (req, res) => {
  const id = req.params.id
  getContent(jsonFile)
  .then(({ articles }) => {
    const article = articles.find(item => item.id == id)
    if(article) res.render('news/single', article)
    else res.status(404).render('error', { message: `No items with ID ${id}`})
  }).catch(error => res.render('error', { message : error.message}))
}

const getContent = async (filename, charset='utf-8') => {
  return readFile(filename, charset)
  .then((data) => {
    const news = JSON.parse(data)
    // Depuis news.rss.channel on décompose pour récupérer item et title
    const { item, title } = news.rss.channel // idem que const item = news.rss.channel.item et title = news.rss.channel.title
    const articles = item.map(article => {
      const { title, id, pubDate, description, link } = article
      const credit = article.content.credit?.__text??'NC'
      const enclosure = article.content._url
      return { id, title, pubDate, enclosure, description, credit, link }
    })
    return { articles, title }
  })
  .catch(error => error)
}

module.exports = {
  checkID,
  findOne,
  findAll
}