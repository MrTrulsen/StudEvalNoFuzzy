
function checkForErrorInAddQuestion(question, text, complexity, time, difficulty, importance, btn) {
    //If length = 0 it will return an error message and not continue
    if (text.length === 0) {
        showErrorMessage("question", "The field can not be empty");
        btn.removeAttribute("data-dismiss", "modal");
    }

    else if (difficulty.length === 0) {
        showErrorMessage("difficulty", "The field can not be empty");
        btn.removeAttribute("data-dismiss", "modal");
    }
    //Checks if the input fields exceeds the maximum value
    else if (difficulty > 100) {
        showErrorMessage("difficulty", "This value can not exceed a total of 100");
        btn.removeAttribute("data-dismiss", "modal");
    }

    else if (complexity.length === 0) {
        showErrorMessage("complexity", "The field can not be empty");
        btn.removeAttribute("data-dismiss", "modal");
    }

    else if (complexity > 100) {
        showErrorMessage("complexity", "This value can not exceed a total of 100");
        btn.removeAttribute("data-dismiss", "modal");
    }

    else if (time.length === 0) {
        showErrorMessage("time", "The field can not be empty");
        btn.removeAttribute("data-dismiss", "modal");
    }

    else if (time > 100) {
        showErrorMessage("time", "This value can not exceed a total of 100");
        btn.removeAttribute("data-dismiss", "modal");
    }

    else if (importance.length === 0) {
        showErrorMessage("importance", "The field can not be empty");
        btn.removeAttribute("data-dismiss", "modal");
    }

    else if (importance > 100) {
        showErrorMessage("importance", "This value can not exceed a total of 100");
        btn.removeAttribute("data-dismiss", "modal");
    }

    else {
        addQuestion(question);
    }
}

//Checks for error at user input
function checkForErrorInAddEvaluation(evaluation, courseId, courseName, evalDates, examTime, btn, email) {
    //If length = 0 it will return an error message and not continue
    if (courseId.length === 0) {
        showErrorMessage("addEvalCourseId", "The field can not be empty");
        btn.removeAttribute("data-dismiss", "modal");
    }

    else if (courseName.length === 0) {
        showErrorMessage("addEvalCourseName", "The field can not be empty");
        btn.removeAttribute("data-dismiss", "modal");
    }

    else if (evalDates.length === 0) {
        showErrorMessage("addEvalDates", "The field can not be empty");
        btn.removeAttribute("data-dismiss", "modal");
    }

    else if (examTime.length === 0) {
        showErrorMessage("addEvalExamTime", "The field can not be empty");
        btn.removeAttribute("data-dismiss", "modal");
    }

    else {
        addEvaluation(evaluation, courseName, email);
    }
}