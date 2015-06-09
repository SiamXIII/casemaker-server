var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schemas
var Ware = new Schema({
    '_id': Schema.ObjectId,
    'name': String,
    'description': String,
    'price': Number,
    'imageUrl': String,
    'imageType': String,
    'category': String
});

module.exports = mongoose.model('Ware', Ware);