const express = require('express');
const { 
  getJsonObject, 
  getTalkerById, 
  addTalkerOnJson, 
  editTalkerById, 
} = require('../utils/filesFuncAux');
const tokenMiddleware = require('../middleware/tokenValidate');
const { 
  nameValidate, 
  ageValidate, 
  talkValidate, 
  talkKeysValidate, 
} = require('../middleware/bodyValidate');

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

router.use(tokenMiddleware, nameValidate, ageValidate, talkValidate, talkKeysValidate);

router.post('/', async (req, res) => {
  const result = await addTalkerOnJson(req.body);
  if (!result) return res.sendStatus(500);

  return res.status(201).json(result);
});

router.put('/:id', async (req, res) => {
  const { params: { id } } = req;
  const { body } = req;
  const result = await editTalkerById(id, body);

  if (!result) return res.sendStatus(500);

  res.status(200).json(result);
});

module.exports = router;
