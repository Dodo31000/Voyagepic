const mongoose = require('mongoose');

const continents = require('./continent');
const Countries = require('./country');

const pictureSchema = mongoose.Schema({
    continent: { type: mongoose.Schema.Types.ObjectId, ref: 'continents' },
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'Countries' },
    name:{ type: String, required: true },
    location: { type: String, required: true },
    lat:{ type: Number, required: true },
    long:{ type: Number, required: true },
    legend:{ type: String },
    imageUrl:{ type: String, required: true }
});

module.exports = mongoose.model('Pictures', pictureSchema);