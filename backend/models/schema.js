const mongoose = require('mongoose');

const siteSchema = mongoose.Schema({
    list : [ 
        {
            name: { type: String, required: true }, 
            countries: [
                {
                name:{ type: String, required: true },
                lat:{ type: Number, required: true },
                long:{ type: Number, required: true },
                description: { type: String },
                images:
                [
                    {
                        number:{ type: Number, required: true },
                        location: { type: String, required: true },
                        lat:{ type: Number, required: true },
                        long:{ type: Number, required: true },
                        legend:{ type: String }
                    },
                ]
            }
        ]
    }]
});

module.exports = mongoose.model('site', siteSchema);