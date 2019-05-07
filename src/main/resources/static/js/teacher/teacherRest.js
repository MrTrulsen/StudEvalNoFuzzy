
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
        .then( async function (evaluations) {
        console.log("Evaluation data: ", evaluations);

            if (Array.isArray(evaluations)) {
                for (var i = 0; i < evaluations.length; i++) {
                    var evaluation = evaluations[i];
                    const test = await getCourseName(evaluation["courseId"]);
                    console.log(evaluation);
                    addEvaluationCard(evaluation, returnString);
                }
            }
        });
}

//Loads answers from an evaluation
function loadAnswersGraph() {
    console.log("Loading answers...");
    fetch("/getAnswersInEval/" + evalId).then(function(response) {
        return response.json();
    })
        .then(function (answers) {
            console.log("Answer data: ", answers);

            if (Array.isArray(answers)) {
                for (var i = 0; i < answers.length; i++) {
                    var answer = answers[i];
                    console.log(answer);
                    this.answers = answers;
                }
            }
        });
}

//Loads questions from the database
function loadQuestionsGraph() {
    console.log("Loading questions...");
    fetch("/getQuestionsInEval/" + evalId).then(function(response) {
        return response.json();
    })
        .then(function (questions) {
            console.log("Question data: ", questions);

            if (Array.isArray(questions)) {
                for (var i = 0; i < questions.length; i++) {
                    var question = questions[i];
                    console.log(question);
                    this.questions = questions;
                }
            }
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
