const Session = require('../models/session');
const Ticket = require('../models/tickets');

exports.createSession = async (sessionData) => {
  try {
    const session = new Session(sessionData);
    await session.save();
    return session;
  } catch (err) {
    throw new Error('Erro ao criar sessão: ' + err.message);
  }
};

exports.getSession = async () => {
  try {
    const session = await Session.find();
    return session;
  } catch (err) {
    throw new Error('Erro ao buscar sessão: ' + err.message);
  }
};

exports.getSessionById = async (sessionId) => {
  try {
    const session = await Session.findById(sessionId).populate('tickets');
    if (!session) {
      throw new Error('Sessão não encontrada');
    }
    return session;
  } catch (err) {
    throw new Error('Erro ao buscar sessão: ' + err.message);
  }
};

exports.buyTicket = async (ticketData) => {
  try {
    const ticket = new Ticket(ticketData);
    await ticket.save();
    return ticket;
  } catch (err) {
    throw new Error('Erro ao comprar ingresso: ' + err.message);
  }
};
