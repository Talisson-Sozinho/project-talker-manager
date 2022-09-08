const dateValidate = require('../../utils/dateFormat');

const WATCHED_NOT_FOUND_MESSAGE = {
  message: 'O campo "watchedAt" é obrigatório',
};

const WATCHED_FORMAT_ERROR = {
  message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
};

const RATE_NOT_FOUND_MESSAGE = {
  message: 'O campo "rate" é obrigatório',
};

const RATE_VALUE_ERROR = {
  message: 'O campo "rate" deve ser um inteiro de 1 à 5',
};

const rateRange = (rate) => rate < 1 || rate > 5;

module.exports = (req, res, next) => {
  const { talk: { watchedAt, rate } } = req.body;

  if (!watchedAt) return res.status(400).json(WATCHED_NOT_FOUND_MESSAGE);

  if (!dateValidate(watchedAt)) return res.status(400).json(WATCHED_FORMAT_ERROR);

  if (!rate) return res.status(400).json(RATE_NOT_FOUND_MESSAGE);

  if (rateRange(+rate)) return res.status(400).json(RATE_VALUE_ERROR);

  return next();
};