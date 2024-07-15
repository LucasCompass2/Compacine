var mongoose = require('mongoose')

const TicketSchema = new mongoose.Schema({
    chair: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
  });

const SessionSchema  = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Movie',
        required: true
      },
    time: {
        type: Date,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    room: {
        type: Number,
        required: true,
    },
    tickets: {
        type: [TicketSchema],
        required: true,
    }
});


const Session = mongoose.model('Session', SessionSchema)

module.exports = Session;
