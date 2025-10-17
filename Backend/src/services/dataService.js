const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fileHelper = require('../utils/fileHelper');

const SESSIONS_PATH = path.join(__dirname, '..', 'data', 'sessions.json');
const RESPONSES_PATH = path.join(__dirname, '..', 'data', 'responses.json');
const HISTORIES_DIR = path.join(__dirname, '..', 'data', 'histories');

async function getSessions() {
  const sessions = await fileHelper.readJson(SESSIONS_PATH);
  return sessions;
}

async function createSession(title) {
  const sessions = await fileHelper.readJson(SESSIONS_PATH);
  const id = uuidv4();
  const newSession = {
    id,
    title: title || `New Chat ${sessions.length + 1}`,
    lastUpdated: new Date().toISOString()
  };
 
  sessions.unshift(newSession);
  await fileHelper.writeJson(SESSIONS_PATH, sessions);
 
  await fileHelper.ensureDir(HISTORIES_DIR);
  await fileHelper.writeJson(path.join(HISTORIES_DIR, `${id}.json`), { id, history: [] });
  return newSession;
}

async function getSessionHistory(sessionId) {
  
  const sessions = await fileHelper.readJson(SESSIONS_PATH);
  const found = sessions.find(s => s.id === sessionId);
  if (!found) return null;
  await fileHelper.ensureDir(HISTORIES_DIR);
  const historyPath = path.join(HISTORIES_DIR, `${sessionId}.json`);
 
  if (!(await fileHelper.exists(historyPath))) {
    await fileHelper.writeJson(historyPath, { id: sessionId, history: [] });
    return { id: sessionId, history: [] };
  }
  return await fileHelper.readJson(historyPath);
}

async function addMessage(sessionId, questionText) {

  const sessions = await fileHelper.readJson(SESSIONS_PATH);
  const session = sessions.find(s => s.id === sessionId);
  if (!session) throw new Error('Session not found');

  const responses = await fileHelper.readJson(RESPONSES_PATH);
  if (!responses || !Array.isArray(responses.responses)) throw new Error('No responses configured');
  const pool = responses.responses;
  const chosen = pool[Math.floor(Math.random() * pool.length)];

  const message = {
    messageId: uuidv4(),
    question: questionText,
    answer: chosen.table, 
    description: chosen.description,
    feedback: null,
    timestamp: new Date().toISOString()
  };

  await fileHelper.ensureDir(HISTORIES_DIR);
  const historyPath = path.join(HISTORIES_DIR, `${sessionId}.json`);
  let historyObj = { id: sessionId, history: [] };
  if (await fileHelper.exists(historyPath)) historyObj = await fileHelper.readJson(historyPath);
  historyObj.history.push(message);
  await fileHelper.writeJson(historyPath, historyObj);

  session.lastUpdated = new Date().toISOString();
  
  const idx = sessions.findIndex(s => s.id === sessionId);
  if (idx > -1) {
    const [sObj] = sessions.splice(idx, 1);
    sessions.unshift({ ...sObj, lastUpdated: session.lastUpdated });
  }
  await fileHelper.writeJson(SESSIONS_PATH, sessions);

  return message;
}

module.exports = {
  getSessions,
  createSession,
  getSessionHistory,
  addMessage
};
