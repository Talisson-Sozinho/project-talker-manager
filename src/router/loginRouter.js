const express = require('express');
const { tokenGenerator } = require('../utils/loginFuncAux');

const router = express.Router();

router.post('/', (_req, res) => (
  res.status(200).json({ token: tokenGenerator() })
));

module.exports = router;
