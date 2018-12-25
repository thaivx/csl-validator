let isBase64 = require('is-base64');

module.exports = function (value, validations = null) {
    if (!value || !isBase64(value)) {
        return 'Invalid data type';
    }
};