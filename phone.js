let util = require('util');

module.exports = function (value, validations = null) {
    if (!(/^.{6,}[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g.test(value))) {
        return "Phone is invalid."
    }
};