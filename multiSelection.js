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

    if (validations.inList && Array.isArray(validations.inList)) {
        let flag = true,
            list = lowerCaseList(validations.inList);
        _.each(values, item => {
            if (list.indexOf(String(item).toLowerCase()) === -1) {
                console.log('set flag to false');
                flag = false;
            }
        });

        return !flag ? "The answer must be in [" + validations.inList.toString() + "]" : null;
    }
};

function lowerCaseList(list) {
    return _.map(list, function (item) {
        return item.toLowerCase();
    });
}