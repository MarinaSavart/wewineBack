const mongoose = require("mongoose");

const bottleSchema = mongoose.Schema({
    
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    domain: {type: String, required: true},
    vintage: {type: String, required: true},
    color: {type: Number, required: true},
    description: {type: String, default: "C'est bouteille n'a pas de description !"}
});

module.exports = mongoose.model('Bottle', bottleSchema);