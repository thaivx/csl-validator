module.exports = function fieldValidate(answer, question) {
    let validations = question.validations;

    // Check if no answer given
    if (answer === null || answer === undefined || answer === '') {
        if (question.isMandatory) {
            return 'is required.';
        }
        return true;
    }

    // If no validation, then just validate for type
    if (!validations) {
        return require('./validator/' + question.type)(answer, {});
    }

    // Validation for inList, ignore case sensitive
    if (Array.isArray(validations.inList) && question.type !== 'multiSelection') {
        if (validations.inList.indexOf(String(answer).toLowerCase()) === -1) {
            return "The answer must be in [" + validations.inList.toString() + "]";
        }
    }

    // Validation for notInList, ignore case sensitive
    if (Array.isArray(validations.notInList)) {
        if (validations.notInList.indexOf(String(answer).toLowerCase()) !== -1) {
            return "The answer must be not in [" + validations.notInList.toString() + "]";
        }
    }

    // Validation for type and some special conditions such as min, max, email, number ...
    return require('./' + question.type)(answer, validations);
};