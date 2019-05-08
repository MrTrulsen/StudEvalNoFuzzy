
// Checks for error at user input inside modal for adding question
function checkForErrorInAddQuestion(question, text, complexity, time, difficulty, importance) {

    if (text.length === 0) {
        showErrorMessage("text", "The field can not be empty");
    }

    else if (difficulty.length === 0) {
        showErrorMessage("difficulty", "The field can not be empty");
    }

    else if (difficulty > 100) {
        showErrorMessage("difficulty", "This value can not exceed a total of 100");
    }

    else if (complexity.length === 0) {
        showErrorMessage("complexity", "The field can not be empty");
    }

    else if (complexity > 100) {
        showErrorMessage("complexity", "This value can not exceed a total of 100");
    }

    else if (time.length === 0) {
        showErrorMessage("time", "The field can not be empty");
    }

    else if (time > 100) {
        showErrorMessage("time", "This value can not exceed a total of 100");
    }

    else if (importance.length === 0) {
        showErrorMessage("importance", "The field can not be empty");
    }

    else if (importance > 100) {
        showErrorMessage("importance", "This value can not exceed a total of 100");
    }

    else {
        addQuestion(question);
    }
}

// Checks for error at user input inside modal for adding evaluation
function checkForErrorInAddEvaluation(evaluation, courseId, courseName, evalDates, examTime) {

    if (courseId.length === 0) {
        showErrorMessage("addEvalCourseId", "The field can not be empty");
    }

    else if (courseName.length === 0) {
        showErrorMessage("addEvalCourseName", "The field can not be empty");
    }

    else if (evalDates.length === 0) {
        showErrorMessage("addEvalDates", "The field can not be empty");
    }

    else if (examTime.length === 0) {
        showErrorMessage("addEvalExamTime", "The field can not be empty");
    }

    else {
        addEvaluation(evaluation, courseName);
    }
}