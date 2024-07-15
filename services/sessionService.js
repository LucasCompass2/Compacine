const Session = require('../models/session');

exports.createSession = async (sessionData) => {
  try {
    const session = new Session(sessionData);
    await session.save();
    return session;
  } catch (err) {
    throw new Error('Erro ao criar sessão: ' + err.message);
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

exports.checkChairAvailability = async (sessionId, chair) => {
  try {
    const session = await Session.findById(sessionId);
    if (!session) {
      throw new Error('Sessão não encontrada');
    }
    const ticket = session.tickets.find(t => t.chair === chair);
    return !ticket; // Retorna true se a cadeira estiver disponível
  } catch (err) {
    throw new Error('Erro ao verificar disponibilidade de cadeira: ' + err.message);
  }
};

exports.buyTicket = async (sessionId, chair, value) => {
  try {
    const isAvailable = await this.checkChairAvailability(sessionId, chair);
    if (!isAvailable) {
      throw new Error('Cadeira já está ocupada');
    }
    const ticketData = { session: sessionId, chair, value };
    const ticket = new Ticket(ticketData);
    await ticket.save();
    await Session.findByIdAndUpdate(sessionId, { $push: { tickets: ticket._id } });
    return ticket;
  } catch (err) {
    throw new Error('Erro ao comprar ingresso: ' + err.message);
  }
};
