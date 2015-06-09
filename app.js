/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var multiparty = require('multiparty');

var app = express();
var waresRepo = require('./repos/ware-repo.js')();
var categoriesRepo = require('./repos/category-repo')();
var slidesRepo = require('./repos/slides-repo')();

app.set('port', 3000);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', "Content-Type");
    res.setHeader('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE");
    next();
});

app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.get('/api/wares', function (req, res) {
    waresRepo.getWares(req.query, function (err, data) {
        if (!err) {
            return res.send(data);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({error: 'Server error'});
        }
    });
});

app.get('/api/categories', function (req, res) {
    if (!req.query.top) {
        categoriesRepo.getCategories(req.query, function (err, data) {
            if (!err) {
                return res.send(data);
            } else {
                res.statusCode = 500;
                log.error('Internal error(%d): %s', res.statusCode, err.message);
                return res.send({error: 'Server error'});
            }
        });
    }
    else {
        categoriesRepo.getTop(function (err, data) {
            if (!err) {
                return res.send(data);
            } else {
                res.statusCode = 500;
                log.error('Internal error(%d): %s', res.statusCode, err.message);
                return res.send({error: 'Server error'});
            }
        });
    }
});

app.get('/api/slides', function (req, res) {
    slidesRepo.getAllSlides(function (err, data) {
        if (!err) {
            return res.send(data);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({error: 'Server error'});
        }
    });
});

app.get('/api/images', function (req, res) {
    if (fs.lstatSync('images\\storage\\' + req.query.imageUrl)) {
        var img = fs.readFileSync('images\\storage\\' + req.query.imageUrl);
        res.writeHead(200, {'Content-Type': req.query.imageType});
        res.end(img, 'binary');
    }
    else {
        var img = fs.readFileSync('images\\storage\\empty-image.jpg');
        res.writeHead(200, {'Content-Type': req.query.imageType});
        res.end(img, 'binary');
    }
})
;

app.post('/api/wares', function (req, res) {
    var item = req.body;

    waresRepo.saveWare(item, function (result) {
        res.send(result);
    });
});

app.post('/api/categories', function (req, res) {
    var item = req.body;

    categoriesRepo.saveCategory(item, function (result) {
        res.send(result);
    });
});

app.post('/api/slides', function (req, res) {
    var item = req.body;

    slidesRepo.saveSlide(item, function (result) {
        res.send(result);
    });
});

app.post('/api/upload', function (req, res) {
    var form = new multiparty.Form();

    form.parse(req, function (err, fields, files) {
        var file = files.Files[0];
        fs.readFile(file.path, 'binary', function (err, data) {
            // ...
            fs.writeFile('images\\storage\\' + file.originalFilename, data, 'binary',
                function (err) {
                    console.log('Upload completed:' + file.originalFilename);
                    res.send('Upload completed:' + file.originalFilename);
                }
            )
            ;
        });
    });
});

app.delete('/api/slides', function (req, res) {
    slidesRepo.deleteSlide(req.query.id, function(){
        res.send('Success');
    });
});

app.delete('/api/categories', function (req, res) {
    categoriesRepo.deleteCategory(req.query.id, function(){
        res.send('Success');
    });
});

app.delete('/api/wares', function (req, res) {
    waresRepo.deleteWare(req.query.id, function(){
        res.send('Success');
    });
});

app.get('/', function (req, res) {
    res.send('Hello World');
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
