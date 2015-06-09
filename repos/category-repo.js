var categoriesDataAccess = require('../data-access/data-access.js').Categories;
var ObjectID = require('mongodb').ObjectID;

var instance = {
    getCategories: function (query, callback) {
        categoriesDataAccess.find(query)
            .exec(callback);
    },

    getTop: function (callback) {
        categoriesDataAccess.find({$or: [{'parentCategory': {$exists: false}}, {'parentCategory': ''}]})
            .exec(callback);
    },

    saveCategory: function (category, callback) {

        category._id = category._id || new ObjectID();

        categoriesDataAccess.findOneAndUpdate({'_id': category._id}, category, {upsert: true}, function (err, data) {
            if (!err) {
                callback('OK');
            }
        });
    },

    deleteCategory: function (id, callback) {
        categoriesDataAccess.remove({_id: id}, callback);
    }
}

module.exports = function () {
    return instance;
}
/**
 * Created by Siam on 5/28/2015.
 */
