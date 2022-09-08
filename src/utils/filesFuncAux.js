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

async function addTalkerOnJson(talker) {
  const talkerList = await getJsonObject();
  if (!talkerList) return null;

  const newTalker = {
    ...talker,
    id: talkerList[talkerList.length - 1].id + 1,
    talk: {
      ...talker.talk,
    },
  };
  talkerList.push(newTalker);
  try {
    await fs.writeFile(jsonPath, JSON.stringify(talkerList));
    return newTalker;
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
  addTalkerOnJson,
};