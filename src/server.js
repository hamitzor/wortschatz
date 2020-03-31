const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const controllers = require('./controllers');
const database = require('./database');
const path = require('path');
const os = require('os');
const fs = require('fs');

exports.init = (port = 4000) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/static', express.static(path.resolve(__dirname, '../static')));
    app.post('/add/:collection', controllers.add);
    app.post('/update/:collection/:_id', controllers.update);
    app.get('/delete/:collection/:_id', controllers.delete);
    app.get('/word/display/:collection/:_id', controllers.displayView);
    app.get('/word/random/:collection', controllers.randomView);
    app.get('/word/edit/:collection/:_id', controllers.editView);
    app.get('/word/add/:collection', controllers.addView);
    app.get('/list/:collection/', controllers.listView);
    app.get('/', (req, res) => res.redirect('/word/random/noun'));
    const databaseFile = path.resolve(__dirname, '.database.json');
    database.init(databaseFile);
    setInterval(() => {
        fs.copyFileSync(databaseFile, path.resolve(os.homedir(), '.wortschatz-database.json'));
    }, 1000 * 60 * 60);
    app.listen(port, () => console.log(`Listening at http://localhost:${port}`));
}