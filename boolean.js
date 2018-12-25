let util = require('util');

module.exports = function (value, questions) {
    if (String(value) !== 'true' && String(value) !== 'false') {
        return value + " is not boolean";
    }
};