let util = require('util');

module.exports = function (value, validations = null) {
    util.isString(value) || (value = '');

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))) {
        return "Email is invalid."
    }
};