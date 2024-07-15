var mongoose = require('mongoose')

const MovieSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
    description: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    actors: {
        type: [String],
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    session: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Session'
    }]
});


const Movie = mongoose.model('Movie', MovieSchema)

module.exports = Movie;
