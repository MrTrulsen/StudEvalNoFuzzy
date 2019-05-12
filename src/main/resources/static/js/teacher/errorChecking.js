
// Checks for error at user input inside modal for adding question
function checkForErrorInAddQuestion(question, text, complexity, time, difficulty, importance) {

    if (text.value.length === 0 || difficulty.value.length === 0 || complexity.value.length === 0 ||
        time.value.length === 0 || importance.value.length === 0) {

        checkEmptyField(text);
        checkEmptyField(difficulty);
        checkEmptyField(complexity);
        checkEmptyField(time);
        checkEmptyField(importance);
    }

    else if (difficulty.value > 100 || complexity.value > 100 || time.value > 100 || importance.value > 100) {

        checkForMaximumValue(difficulty);
        checkForMaximumValue(complexity);
        checkForMaximumValue(time);
        checkForMaximumValue(importance);
    }

    else {
        addQuestion(question);
    }
}

// Checks for error at user input inside modal for adding evaluation
function checkForErrorInAddEvaluation(evaluation, courseId, courseName, evalDates, examTime) {

    if (courseId.value.length === 0 || courseName.value.length === 0 || evalDates.value.length === 0 ||
        examTime.value.length === 0) {

        checkEmptyField(courseId);
        checkEmptyField(courseName);
        checkEmptyField(evalDates);
        checkEmptyField(examTime);
    }

    else {
        addEvaluation(evaluation, courseName);
    }
}

// Checks if input field is empty
function checkEmptyField(field) {
    if (field.value.length === 0) {
        showErrorMessage(field.id.slice(0, - 5), "The field can not be empty");
    }
}

// Checks if input field's value is over 100
function checkForMaximumValue(field) {
    if (field.value.length > 0) {
        showErrorMessage(field.id.slice(0, - 5), "The field can not be empty");
    }
}