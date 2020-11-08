const mongoose = require('mongoose');
const Pictures = require('./picture');
const continents = require('./continent');

const countrySchema = mongoose.Schema({
    continent: { type: mongoose.Schema.Types.ObjectId, ref: 'continents', required: true },
    name:{ type: String, required: true },
    imageUrl:{ type: String, required: true },
    lat:{ type: Number, required: true },
    long:{ type: Number, required: true },
    description: { type: String, required: true },
    pictures:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Pictures' }]
});

module.exports = mongoose.model('Countries', countrySchema);