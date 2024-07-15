const sessionService = require('../services/sessionService');

exports.createSession = async (req, res) => {
  const sessionData = req.body;
  try {
    const newSession = await sessionService.createSession(sessionData);
    res.status(201).json(newSession);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSessionById = async (req, res) => {
  const sessionId = req.params.id;
  try {
    const session = await sessionService.getSessionById(sessionId);
    res.status(200).json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.buyTicket = async (req, res) => {
  const { sessionId, chair, value } = req.body;
  try {
    const ticket = await sessionService.buyTicket(sessionId, chair, value);
    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};