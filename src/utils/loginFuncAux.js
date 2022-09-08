function tokenGenerator() {
  const token = [];
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 16; i += 1) {
    token.push(characters.charAt(Math.random() * 61));
  }
  return token.join('');
}

module.exports = { tokenGenerator };
