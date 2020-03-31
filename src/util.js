const fs = require('fs');
const path = require('path');
const t7 = require('template7');

const getTemplate = name => fs.readFileSync(path.resolve(__dirname, '../templates', `${name}.html`)).toString();
exports.createView = layout => name => {

    console.log(layout ? getTemplate(layout).replace('{{BODY}}', getTemplate(name)) : getTemplate(name));
    return t7.compile(layout ? getTemplate(layout).replace('{{BODY}}', getTemplate(name)) : getTemplate(name))
};