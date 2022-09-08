const TALK_NOT_FOUND_MESSAGE = {
  message: 'O campo "talk" é obrigatório',
};

module.exports = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) return res.status(400).json(TALK_NOT_FOUND_MESSAGE);

  return next();
};
