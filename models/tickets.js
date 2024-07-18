var mongoose = require('mongoose')

const TicketsSchema  = new mongoose.Schema({
    session: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Session',
        required: true 
    },
    chair: {
        type: String,
        required: true
      },
    value: {
        type: Number,
        required: true,
    }
});

const Tickets = mongoose.model('Tickets', TicketsSchema)

module.exports = Tickets;
