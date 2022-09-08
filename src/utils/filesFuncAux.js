const fs = require('fs').promises;
const { join } = require('path');

const jsonPath = join(__dirname, '../talker.json');

async function getJsonObject() {
  try {
    return JSON.parse(await fs.readFile(jsonPath, 'utf-8'));
  } catch (e) {
    console.error(e);
    return null;
  }
}

module.exports = {
  getJsonObject,
};