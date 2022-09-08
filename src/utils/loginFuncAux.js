const emailRegex = require('./emailRegex');

function tokenGenerator() {
  const token = [];
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 16; i += 1) {
    token.push(characters.charAt(Math.random() * 61));
  }
  return token.join('');
}
const emailValidator = (email) => emailRegex.test(email);

const passwordValidator = (password) => password.length >= 6;

module.exports = { 
  tokenGenerator, 
  emailValidator,
  passwordValidator,
};
