export default (req, res, next) => {
  const id = req.params.id;
  if (!/\d+/.test(id)) {
    res.status(400).send({ success: false, message: `${id} must be a number` });
  } else {
    next();
  }
}