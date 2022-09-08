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

async function searchByName(name) {
  const talkerList = await getJsonObject();
  if (!talkerList) return null;
  const talkerListFiltered = talkerList.filter(({ name: curName }) => curName.includes(name));
  return talkerListFiltered;
}

async function saveData(talkerList) {
  try {
    await fs.writeFile(jsonPath, JSON.stringify(talkerList));
    return true;
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
  if (!await saveData(talkerList)) return null;
  return newTalker;
}

async function getTalkerById(id) {
  const data = await getJsonObject();
  if (!data) return null;
  return data.find(({ id: currentTalkerId }) => currentTalkerId === Number(id));
}

async function editTalkerById(id, newInfoTalker) {
  const data = await getJsonObject();
  if (!data) return null;

  const editedTalker = {
    ...newInfoTalker,
    id: +id,
    talk: { ...newInfoTalker.talk },
  };

  const newTalkerList = data.map((currentTalker) => {
    if (currentTalker.id === +id) {
      return editedTalker;
    }
    return currentTalker;
  });
  if (!await saveData(newTalkerList)) return null;

  return editedTalker;
}

async function deleteTalk(id) {
  const data = await getJsonObject();
  if (!data) return null;
  const newTalkerList = data.filter(({ id: currentId }) => currentId !== +id);
  if (!await saveData(newTalkerList)) return null;
  return true;
}

module.exports = {
  getJsonObject,
  getTalkerById,
  addTalkerOnJson,
  editTalkerById,
  deleteTalk,
  searchByName,
};