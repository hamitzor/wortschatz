const database = require('./database');
const { createView } = require('./util');
const view = createView('layout');
const _ = require('underscore');
const randomNumber = require("random-number-csprng");
const querystring = require("querystring");

exports.add = function (req, res) {
    const { collection } = req.params;
    try {
        database.add(collection, req.body);
        res.redirect(`/word/add/${collection}`);
    }
    catch (err) {
        res.send({ status: 'ERROR', err });
    }
};
exports.update = function (req, res) {
    let { collection, _id } = req.params;
    _id = querystring.unescape(_id);
    try {
        database.update(collection, _id, req.body);
        res.redirect(`/word/display/${collection}/${_id}`);
    }
    catch (err) {
        res.send({ status: 'ERROR', err });
    }
};
exports.delete = function (req, res) {
    let { collection, _id } = req.params;
    _id = querystring.unescape(_id);
    try {
        database.delete(collection, _id);
        res.redirect(`/list/${collection}`);
    }
    catch (err) {
        res.send({ status: 'ERROR', err });
    }
};
exports.displayView = function (req, res) {
    let { collection, _id } = req.params;
    _id = querystring.unescape(_id);
    res.send(view(`display-${collection}`)({
        entity: database.findOne(collection, _id),
        cssList: ['core', `display-${collection}`],
        jsList: [`display`]
    }));
};
exports.editView = function (req, res) {
    let { collection, _id } = req.params;
    _id = querystring.unescape(_id);
    res.send(view(`edit-${collection}`)({
        entity: database.findOne(collection, _id),
        cssList: ['core'],
        jsList: []
    }));
};
exports.addView = function (req, res) {
    const { collection } = req.params;
    res.send(view(`add-${collection}`)({
        cssList: ['core'],
        jsList: [`add-${collection}`]
    }));
};
exports.listView = function (req, res) {
    const { collection } = req.params;
    const list = database.findAll(collection);
    res.send(view(`list`)({
        collection,
        list: _.sortBy(list, '_id'),
        count: list.length,
        cssList: ['core', 'list'],
        jsList: []
    }));
};
exports.randomView = function (req, res) {
    const { collection } = req.params;
    const list = database.findAll(collection);
    if (list.length > 1)
        randomNumber(0, list.length - 1).then(num => {
            res.send(view(`display-${collection}`)({
                collection,
                entity: list[num],
                cssList: ['core', `display-${collection}`],
                jsList: [`display`]
            }));
        });
    else
        res.send(view(`display-${collection}`)({
            collection,
            entity: list[0],
            cssList: ['core', `display-${collection}`],
            jsList: [`display`]
        }));
};