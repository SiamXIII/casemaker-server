var slidesDataAccess = require('../data-access/data-access.js').Slides;
var ObjectID = require('mongodb').ObjectID;

var instance = {
    getAllSlides: function (callback) {
        slidesDataAccess.find()
            .exec(callback);
    },

    saveSlide: function (slide, callback) {

        var slide = new slidesDataAccess(slide);
        slide._id = slide._id || new ObjectID();
        slide.save(function (err, data) {
            if (!err) {
                callback('OK');
            }
        });
    },

    deleteSlide: function (id, callback) {
        slidesDataAccess.remove({_id: id}, callback);
    }
}

module.exports = function () {
    return instance;
}
/**
 * Created by Siam on 5/28/2015.
 */
/**
 * Created by Siam on 5/30/2015.
 */
