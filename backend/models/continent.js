const mongoose = require('mongoose');
const Countries = require('./country');

const continentSchema = mongoose.Schema({
  //_id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  imageUrl:{ type: String, required: true },
  countries : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Countries' }]
});

module.exports = mongoose.model('continents', continentSchema);