const mongoose = require('mongoose');
const Url = require('./../models/Url');
const base58 = require('../base58.js');

module.exports = app => {
        var base58 = require('./../base58');
        var path = require('path');
        var fs = require('fs');

        app.get('/api/:url*', (req, res) => {
            const original_url = req.params['url']+req.params[0];
            const webhost = req.protocol + '://' + req.get('host');

            getUrlShortener(webhost, original_url)
                .then((short_url) => {
                    res.send(JSON.stringify({ original_url, short_url }));
                })
                .catch((error) => {
                    res.send(JSON.stringify({ error }));
                });
        });

        app.get('/:encoded_id', (req, res) => {
            const id = base58.decode(req.params.encoded_id);
            // Use promise instead of callback
            Url.findOne({_id: id})
                .then((doc) => {
                    res.redirect(doc.original_url);
                })
                .catch((err) => {
                    res.setHeader('Location', '/');
                }) ;
        });
    }

    function getUrlShortener(webhost, original_url) {
        return new Promise((resolve, reject) => {
            let short_url ='';
            if (validateUrl(original_url)) {
                Url.findOne({original_url})
                    .then((doc) => {
                        short_url = webhost + '/' + base58.encode(doc._id);
                        return resolve(short_url);
                    })
                    .catch((err) => {
                        var newUrl = new Url({
                            original_url
                        });
                        // save the new link
                        newUrl.save(function(err) {
                            if (err) {
                                return reject('URL invalid');
                            }
                            // construct the short URL
                            short_url = webhost + '/' + base58.encode(newUrl._id);
                            return resolve(short_url);
                        });
                    });
            } else {
                return reject('URL invalid');
            }
        });
    }

    function validateUrl(url) {
        // Checks to see if it is an actual url
        // Regex from https://gist.github.com/dperini/729294
        var regEx = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
        return regEx.test(url);
    }
