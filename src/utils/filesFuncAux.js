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

async function getTalkerById(id) {
  const data = await getJsonObject();
  if (!data) return null;
  return data.find(({ id: currentTalkerId }) => currentTalkerId === Number(id));
}

module.exports = {
  getJsonObject,
  getTalkerById,
};