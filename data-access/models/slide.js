var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schemas
var Slide = new Schema({
    '_id': Schema.ObjectId,
    'name': String,
    'imageUrl': String,
    'imageType': String,
});

module.exports = mongoose.model('Slide', Slide);
/**
 * Created by Siam on 5/30/2015.
 */
