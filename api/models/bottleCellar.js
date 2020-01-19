const mongoose = require('mongoose');

const bottleCellarSchema = mongoose.Schema({
    idCellar: mongoose.Schema.Types.ObjectId,
    idBottle: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('BottleCellar', bottleCellarSchema);