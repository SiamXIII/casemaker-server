var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schemas
var Category = new Schema({
    '_id': Schema.ObjectId,
    'name': String,
    'parentCategory': String,
    'imageUrl': String,
    'imageType': String
});

module.exports = mongoose.model('Category', Category);
/**
 * Created by Siam on 5/28/2015.
 */
