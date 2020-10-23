const mongoose = require('mongoose');
const Countries = require('./country');

const continentSchema = mongoose.Schema({
  //_id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  imageUrl:{ type: String, required: true },
  countries : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Countries' }]
});
//continentSchema.countries.push(countrySchema);
//continentSchema.save(done);
//const Countries = mongoose.model('Countries', countrySchema);

module.exports = mongoose.model('continents', continentSchema);