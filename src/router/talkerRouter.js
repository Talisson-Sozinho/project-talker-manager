const express = require('express');
const { getJsonObject, getTalkerById } = require('../utils/filesFuncAux');

const router = express.Router();

router.get('/', async (_req, res) => {
  const talkerList = await getJsonObject();

  if (!talkerList) return res.sendStatus(500);

  return res.status(200).json(talkerList);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await getTalkerById(id);
  const NOT_FOUND_MESSAGE = {
    message: 'Pessoa palestrante não encontrada',
  };

  if (talker === undefined) return res.status(404).json(NOT_FOUND_MESSAGE);
  if (!talker) return res.sendStatus(500);

  return res.status(200).json(talker);
});

module.exports = router;
