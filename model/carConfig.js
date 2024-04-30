const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    year: Number,
    make: String,
    model: String,
    color: String,
    isPrepped: Boolean,
});

const carConfig = mongoose.model('Car', carSchema);
module.exports = carConfig;