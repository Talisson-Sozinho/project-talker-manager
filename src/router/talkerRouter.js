const express = require('express');
const { getJsonObject } = require('../utils/filesFuncAux');

const router = express.Router();

router.get('/', async (_req, res) => {
  const talkerList = await getJsonObject();

  if (!talkerList) return res.sendStatus(500);

  return res.status(200).json(talkerList);
});

module.exports = router;
