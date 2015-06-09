var waresDataAccess = require('../data-access/data-access.js').Wares;
var ObjectID = require('mongodb').ObjectID;

var instance = {
    getWares: function (query, callback) {
        waresDataAccess.find(query)
            .exec(callback);
    },

    saveWare: function (ware, callback) {

        ware._id = ware._id || new ObjectID();

        waresDataAccess.findOneAndUpdate({'_id': ware._id}, ware, {upsert: true}, function (err, data) {
            if (!err) {
                callback('OK');
            }
        });
    },

    deleteWare: function (id, callback) {
        waresDataAccess.remove({_id: id}, callback);
    }
}

module.exports = function () {
    return instance;
}