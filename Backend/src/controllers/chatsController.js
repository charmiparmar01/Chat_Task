const dataService = require('../services/dataService');

exports.listSessions = async (req, res) => {
  try {
    const sessions = await dataService.getSessions();
    res.json(sessions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load sessions' });
  }
};

exports.createSession = async (req, res) => {
  try {
    const title = req.body.title;
    const session = await dataService.createSession(title);
    res.status(201).json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create session' });
  }
};

exports.getSessionHistory = async (req, res) => {
  try {
    const id = req.params.id;
    const history = await dataService.getSessionHistory(id);
    if (!history) return res.status(404).json({ error: 'Session not found' });
    res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};

exports.postMessage = async (req, res) => {
  try {
    const id = req.params.id;
    const question = req.body.question || '';
    const message = await dataService.addMessage(id, question);
    res.status(201).json(message);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message || 'Failed to post message' });
  }
};
