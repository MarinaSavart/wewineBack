const { Schema, model } = require('mongoose');

const cellarSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true },
    maxContent: { type: Number, required: true },
    userId: { type: Schema.Types.ObjectId, required: true },
    bottles: [{ type: Schema.Types.ObjectId, ref: "Bottle" }]
});

module.exports = model('Cellar', cellarSchema);