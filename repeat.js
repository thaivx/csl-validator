module.exports = function (values, validations) {
    if (!Array.isArray(values)) {
        return "Answers must be a array";
    }

    if (validations.min) {
        if (values.length < validations.min) {
            return "Minimum number of answers is " + validations.min + ". Current is " + values.length;
        }
    }

    if (validations.max) {
        if (values.length > validations.max) {
            return "Maximum number of answers is " + validations.max + ". Current is " + values.length;
        }
    }
};