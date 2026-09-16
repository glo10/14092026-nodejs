export default (req, res, next) => {
  const { name, country } = req.body
  if(name && country && typeof name === 'string' && typeof country === 'string' ){
    req.team = { name, country }
    next()
  } else {
    res.status(400).send({ success: false, message: `New team must have only name and country properties` });
  }
}