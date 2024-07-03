var mongoose = require('mongoose')

const MovieSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
    email: {
        type: String,
        required: true,
        unique: true
    },
});


const Movie = mongoose.model('Movie', MovieSchema)

module.exports = Movie;
