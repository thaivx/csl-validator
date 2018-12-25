function validateAll(questionBlocks) {
    let invalids = {};
    if (answerBlocks) {
        _.each(Object.keys(answerBlocks), key => {

            if (!questionBlocks.hasOwnProperty(key)) {
                return;
            }

            let questions = questionBlocks[key];
            let answers = answerBlocks[key];
            stepValidationResult = stepValidate(answers, questions);
            stepValidationResult === true || (invalids[key] = stepValidationResult);
        });
    }
    return invalids;
}

function stepValidate(answers, questions) {
    if (_.isEmpty(answers)) return true;

    let errors = {};
    _.each(Object.keys(questions), (key) => {
        let answer = answers[key];
        let question = questions[key];
        if (question.requireQuestion) {
            if (answers[question.requireQuestion] !== question.requireValue) {
                delete answers[key];
                return false;
            }
        }

        let errorText = validateField(answer, question);
        if (errorText && typeof errorText === 'string') {
            errors[key] = errorText;
        }

        if (question.type === 'repeat' && Array.isArray(answer)) {
            answer.filter((asws, i) => {
                let itemErr = stepValidate(asws, question.questions);
                if (itemErr !== true) {
                    (errors[key] && _.isObject(errors[key])) || (errors[key] = {});
                    return errors[key][i] = itemErr;
                }
            });
        }
    });

    return _.isEmpty(errors) || errors;
}

function validateField(answer, question) {
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
}

module.exports = {
    validateAll,
    validateField
};

