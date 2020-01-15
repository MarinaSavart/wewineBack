const mongoose = require("mongoose");

const bottleSchema = mongoose.Schema({
    
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    domain: String,
    vintage: String,
    description: String
});

module.exports = mongoose.model('Bottle', bottleSchema);