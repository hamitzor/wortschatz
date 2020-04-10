const fs = require('fs');
const path = require('path');
const t7 = require('template7');
const querystring = require("querystring");

t7.registerHelper('urlEncode', val => querystring.escape(val) );

const getTemplate = name => fs.readFileSync(path.resolve(__dirname, '../templates', `${name}.html`)).toString();
exports.createView = layout => name => t7.compile(layout ? getTemplate(layout).replace('{{BODY}}', getTemplate(name)) : getTemplate(name));