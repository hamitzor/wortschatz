const fs = require('fs');
const _ = require('underscore');
const path = require('path');

const database = {
    init: function (databaseFile) {
        this.databaseFile = databaseFile;
        if (!fs.existsSync(databaseFile)) {
            this.content = { collections: { noun: [], verb: [], other: [] } };
            this.write();
        }
    },
    read: function () {
        this.content = JSON.parse(fs.readFileSync(this.databaseFile));
    },
    write: function () {
        fs.writeFileSync(this.databaseFile, JSON.stringify(this.content, null, '\t'));
    },
    collectionExists: function (collection) {
        if (!this.content.collections[collection])
            throw Error(`There is no collection called ${collection}`);
    },
    add: function (collection, data) {
        this.read();
        this.collectionExists(collection);
        if (_.findWhere(this.content.collections[collection], { _id: data._id }))
            throw Error(`There is already an entry with _id ${data._id}`);
        this.content.collections[collection].push({ ...data, createdAt: new Date(), updatedAt: new Date() });
        this.write();
    },
    update: function (collection, _id, update) {
        this.read();
        this.collectionExists(collection);
        const entry = _.findWhere(this.content.collections[collection], { _id });
        if (!entry)
            throw Error(`There is no entry with _id ${_id}`);
        this.content.collections[collection] = _.reject(this.content.collections[collection], { _id });
        this.content.collections[collection].push({ ...entry, ...update, _id: entry._id, createdAt: entry.createdAt, updatedAt: new Date() });
        this.write();
    },
    delete: function (collection, _id) {
        this.read();
        this.collectionExists(collection);
        if (!_.findWhere(this.content.collections[collection], { _id }))
            throw Error(`There is no entry with _id ${_id}`);
        this.content.collections[collection] = _.reject(this.content.collections[collection], { _id });
        this.write();
    },
    findAll: function (collection, filter) {
        this.read();
        this.collectionExists(collection);
        return filter ? _.where(this.content.collections[collection], filter) : this.content.collections[collection];
    },
    findOne: function (collection, _id) {
        this.read();
        this.collectionExists(collection);
        return _.findWhere(this.content.collections[collection], { _id });
    }
};

module.exports = database;