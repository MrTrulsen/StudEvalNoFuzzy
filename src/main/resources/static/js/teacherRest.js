
//Adds evaluations in the database
function addEvaluation(evaluation, courseName) {
  console.log("Adding evaluation...");
  fetch("/addEvaluation/" + courseName, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(evaluation)
  })
      .then(function (response) {
        var btn = document.getElementById("saveEvaluationBtn");
        console.log("Response: ", response);

        if (response.status === 200) {
            btn.setAttribute("data-dismiss", "modal");
            addEvaluationCard(evaluation, courseName);

        } else {
            btn.removeAttribute("data-dismiss");
            showErrorMessage("modalAddEvalBody", "Error when trying to add evaluation. Please try again.");
            return response.text();
        }
    });
}

//Adds questions to the database
function addQuestion(question) {
    console.log("Adding question...");
    fetch("/addQuestion/1", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(question)
    })
        .then(function (response) {
        var btn = document.getElementById('saveQuestionBtn');
        console.log("Response: ", response);

        if (response.status === 200) {
            console.log(questions);
            btn.setAttribute("data-dismiss", "modal");
            window.location.reload();

        } else {
            btn.removeAttribute("data-dismiss");
            showErrorMessage("modalAddQuestionBody", "Error when trying to add question. Please try again.");
            return response.text();
        }
    });
}

//Loads evaluations from the database
function loadEvaluations() {
    console.log("Loading evaluations...");
    fetch("/getEvaluations/62").then(function(response) {
        return response.json();
    })
        .then(function (evaluations) {
        console.log("Evaluation data: ", evaluations);

        if (Array.isArray(evaluations)) {
            for (var i = 0; i < evaluations.length; i++) {
                var evaluation = evaluations[i];
                console.log(evaluation);

                //TODO: Use this in studentDashboard instead of teacherDashboard
                if (evaluation["stopDate"] < moment().format('YYYY-MM-DD')) {
                    console.log(evaluation["courseId"] + " expired at date " + evaluation["stopDate"]);
                }

                else {
                    //TODO: Make it possible to return the courseName from the function
                    var courseName = getCourseName(evaluation);
                    console.log("Evaluation data: ", courseName);
                    addEvaluationCard(evaluation, courseName);
                }
            }
        }
    });
}

//Loads questions from the database
function loadQuestions() {
    console.log("Loading questions...");
    fetch("/getQuestionsInEval/1").then(function(response) {
        return response.json();
    })
        .then(function (questions) {
        console.log("Evaluation data: ", questions);

        if (Array.isArray(questions)) {
            for (var i = 0; i < questions.length; i++) {
                var question = questions[i];
                console.log(question);
                this.questions = questions;
            }

            if (questions.length === 0 || questions.length === null) {
                console.log("There are no questions");
            }

            else {
                console.log("There are " + questions.length + " questions in this evaluation");
                questionIndex = 0;
                document.getElementById("pageInput").innerHTML = questionIndex + 1;
                updateTotalPagesDisplay();
                generateSliderContent(questions, 0);
            }
        }
    });
}

//Deletes an evaluation from the database
function deleteEvaluation(courseId) {
    console.log("Deleting evaluation: ", courseId);
    fetch("/deleteEvaluation/" + courseId, {
        method: "DELETE"
    })
        .then(function (response) {
        var btn = document.getElementById("removeEvaluationBtn");
        console.log("Response: ", response);

        if (response.status === 200) {
            btn.setAttribute("data-dismiss", "modal");
            window.location.reload();
        }

        else {
            btn.removeAttribute("data-dismiss");
            showErrorMessage("modalRemoveEvalBody", "Error when trying to add question. Please try again.");
            return response.text();
        }
    });
}

//Deletes a question from the database
function deleteQuestion(questionId) {
    console.log("Deleting evaluation: ", questionId);
    fetch("/deleteQuestion/" + questionId, {
        method: "DELETE"
    })
        .then(function (response) {
        var btn = document.getElementById("confirmDeleteQuestionBtn");
        console.log("Response: ", response);
        
        if (response.status === 200) {
            btn.setAttribute("data-dismiss", "modal");
            window.location.reload();
        }

        else {
            btn.removeAttribute("data-dismiss");
            showErrorMessage("modalDeleteQuestionBody", "Error when trying to delete question. Please try again.");
            return response.text();
        }
    });
}

//Saves the current question to the database
function saveQuestion(question) {
    console.log("Adding question...");
    fetch("/editQuestion", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(question)
    })
        .then(function (response) {
        console.log("Response: ", response);

        if (response.status === 200) {
            console.log(questions);
            showSuccessMessage()("buttonArea", "Question successfully saved");
        }

        else {
            showErrorMessage("buttonArea", "Error when trying to save question. Please try again.");
            return response.text();
        }
    });
}

//Gets the name of the course that is being loaded in loadEvaluations()
function getCourseName(evaluation) {
    console.log("Loading course name...");
    fetch("/getNameOfCourse/" + evaluation["courseId"]).then(function(response) {
        console.log(response);
        console.log(response.text());
        return response;
    });
}