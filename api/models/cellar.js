const mongoose = require('mongoose');

const cellarSchema = mongoose.Schema({
    
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    maxContent: {type: Number, required: true},
    userId: { type: mongoose.Types.ObjectId, required: true}
});

module.exports = mongoose.model('Cellar', cellarSchema);