let util = require('util');

module.exports = function (value, validations = null) {

    util.isString(value) || (value = '');

    if (!validations) {
        return true;
    }

    if (validations.min) {
        if (value.length < validations.min) {
            return "The answer need at least " + validations.min + " characters.";
        }
    }
    if (validations.max) {
        if (value.length > validations.max) {
            return "The answer should not exceed " + validations.max + " characters.";
        }
    }
    if (validations.regex) {
        if (!validations.regex.test(value)) {
            return "The answer is not correct";
        }
    }
    if (validations.value) {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(value).toLowerCase())) {
            return "the answer is not an value";
        }
    }
};