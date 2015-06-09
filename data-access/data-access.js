var mongoose = require('mongoose');
var config = require('../config/config.js');

var Ware = require('./models/ware.js');
var Category = require('./models/category');
var Slide = require('./models/slide');

mongoose.connect(config.get('mongoose:uri'));

var db = mongoose.connection;

module.exports.Wares = mongoose.model('Ware', Ware);
module.exports.Categories = mongoose.model('Category', Category);
module.exports.Slides = mongoose.model('Slide', Slide);