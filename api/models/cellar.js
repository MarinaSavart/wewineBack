const mongoose = require('mongoose');

const cellarSchema = mongoose.Schema({
    
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    maxContent: Number
});

module.exports = mongoose.model('Cellar', cellarSchema);