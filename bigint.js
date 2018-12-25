let util = require('util');

module.exports = function (value, validations = null) {
    if (!(/^\d+$/.test(value))) {
        return value + " is not a number";
    }

    if (Math.pow(2, 63) < Number(value)) {
        return value + " is over the limitation.";
    }

    if (validations) {
        if (validations.min) {
            if (value < validations.min) {
                return "Value must greater than " + validations.min + ". Current is " + value;
            }
        }

        if (validations.max) {
            if (value > validations.max) {
                return "Value must less than " + validations.max + ". Current is " + value;
            }
        }
    }

    return true;
};