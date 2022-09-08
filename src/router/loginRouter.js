const express = require('express');
const { tokenGenerator } = require('../utils/loginFuncAux');
const emailMiddleware = require('../middleware/emailValidate');
const passwordMiddleware = require('../middleware/passwordValidate');

const router = express.Router();

router.post('/', emailMiddleware, passwordMiddleware, (_req, res) => (
  res.status(200).json({ token: tokenGenerator() })
));

module.exports = router;
