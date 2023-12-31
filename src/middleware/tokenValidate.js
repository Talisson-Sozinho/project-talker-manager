const { tokenValidator } = require('../utils/loginFuncAux');

module.exports = (req, res, next) => {
  const { authorization } = req.headers; 

  if (!authorization) {
    return res.status(401).json({
      message: 'Token não encontrado',
    });
  }

  if (!tokenValidator(authorization)) {
    return res.status(401).json({
      message: 'Token inválido',
    });
  }

  next();
};
