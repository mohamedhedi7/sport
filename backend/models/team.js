const mongoose = require('mongoose');
const teamSchema = mongoose.Schema({
    name: String,
    foundation: Number,
    owner: String,
    playersId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }],
    stadiumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stadium'
    }
});
const team = mongoose.model('Team', teamSchema);
module.exports = team;