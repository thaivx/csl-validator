let util = require('util');
let moment = require('moment');
let momentFormat = [moment.ISO_8601];

module.exports = function (value, question) {
    util.isString(value) || (value = '');

    if (!moment(value, momentFormat, true).isValid()) {
        return 'Datetime format must be YYYY-MM-DD';
    }
};