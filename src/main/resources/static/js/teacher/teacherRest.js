
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
            window.location.reload();
        }

        else {
            btn.removeAttribute("data-dismiss");
            showErrorMessage("modalAddEvalBody", "Error when trying to add evaluation. Please try again.");
            return response.text();
        }
    });
}

//Adds questions to the database
function addQuestion(question) {
    console.log("Adding question...");
    fetch("/addQuestion/" + evalId, {
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
    fetch("/getEvaluations").then(function(response) {
        return response.json();
    })
        .then(function (evaluations) {
        console.log("Evaluation data: ", evaluations);

        if (Array.isArray(evaluations)) {
            for (var i = 0; i < evaluations.length; i++) {
                var evaluation = evaluations[i];
                console.log(evaluation);

                getCourseName(evaluation["courseId"]);
                addEvaluationCard(evaluation, "courseName");
            }
        }
    });
}

//Loads evaluations from the database
function getCourseName(courseId) {
    console.log("Getting courseName...");
    fetch("/getNameOfCourse/" + courseId).then(function(response) {
        return response.text();
    })
        .then(function (courseName) {
            console.log("Evaluation data: ", courseName);
            return courseName;
            //TODO: Get courseName out of this function
        });
}

//Loads questions from the database
function loadQuestions() {
    console.log("Loading questions in evalID: " + evalId + "...");
    fetch("/getQuestionsInEval/" + evalId).then(function(response) {
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
                console.log("There are " + questions.length + " question(s) in this evaluation");
                questionIndex = 0;
                document.getElementById("pageInput").innerHTML = questionIndex + 1;

                updateTotalPagesDisplay();
                updateQuestionCardInfo();
                generateQuestionCardButtons();
                generateSliderContent(questions, 0);
            }
        }
    });
}

//Deletes an evaluation from the database
function deleteEvaluation() {
    console.log("Deleting evaluation: ", evalId);
    fetch("/deleteEvaluation/" + evalId, {
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

//Deletes an user from the database
function deleteUser(userId) {
    console.log("Deleting user: ", userId);
    fetch("/deleteUser/" + userId, {
        method: "DELETE"
    })
        .then(function (response) {
            var btn = document.getElementById("saveSettingsBtn");
            console.log("Response: ", response);

            if (response.status === 200) {
                btn.setAttribute("data-dismiss", "modal");
                window.location.reload();
            }

            else {
                btn.removeAttribute("data-dismiss");
                showErrorMessage("deleteAccount", "Error when trying to delete user. Please try again.");
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