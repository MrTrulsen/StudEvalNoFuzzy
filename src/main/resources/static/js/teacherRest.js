
//Function to add evaluations in the database
function addEvaluation(evaluation, courseName) {
  console.log("Adding evaluation...");
  fetch("/addEvaluation/" + courseName, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(evaluation)
  }).then(function (response, btn) {
        btn = document.getElementById("saveEvaluationBtn"); //Temporary fix
        console.log("Response: ", response);

        if (response.status === 200) {
            btn.setAttribute("data-dismiss", "modal");
            addEvaluationCard(evaluation);

            removeInputValue(document.getElementById("courseId"));
            removeInputValue(document.getElementById("courseName"));
            removeInputValue(document.getElementById("evalDates"));
            removeInputValue(document.getElementById("examTime"));
        } else {
            btn.removeAttribute("data-dismiss", "modal");
            return response.text();
        }
    }).then(function () {
        showErrorMessage("modalAddEvalBody", "Error when trying to add evaluation. Please try again.");
    });
}

//Function to load evaluations from the database
function loadEvaluations() {
    console.log("Loading evaluations...");
    fetch("/getEvaluations/62").then(function(response) {
        return response.json();
    }).then(function (evaluations) {
        console.log("Evaluation data: ", evaluations);
        if (Array.isArray(evaluations)) {
            for (var i = 0; i < evaluations.length; i++) {
                var evaluation = evaluations[i];
                console.log(evaluation);
                if (evaluation["stopDate"] < moment().calendar()) {
                    console.log(evaluation["courseId"] + " expired at date " + evaluation["stopDate"]);
                }
                else {
                    addEvaluationCard(evaluation);
                }
            }
        }
    });
}

function addQuestion(question) {
  console.log("Adding question...");
  fetch("/addQuestions/1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(question)
  }).then(function (response, btn) {
        btn = document.getElementById('saveQuestionBtn'); //Temporary fix
        console.log("Response: ", response);

        if (response.status === 200) {
            btn.setAttribute("data-dismiss", "modal");
            questions.push(question);
            newQuestionButton(question["question_id"]);
            questionNumber++;

            removeInputValue(document.getElementById("questionInput"));
            removeInputValue(document.getElementById("difficultyInput"));
            removeInputValue(document.getElementById("complexityInput"));
            removeInputValue(document.getElementById("timeInput"));
            removeInputValue(document.getElementById("importanceInput"));
        } else {
            btn.removeAttribute("data-dismiss", "modal");
            return response.text();
        }
    }).then(function () {
        showErrorMessage("modalAddQuestionBody", "Error when trying to add question. Please try again.");
    });
}

//Function to load evaluations from the database
function loadQuestions() {
    console.log("Loading questions...");
    fetch("/getQuestionsInEval/1").then(function(response) {
        return response.json();
    }).then(function (questions) {
        console.log("Evaluation data: ", questions);
        if (Array.isArray(questions)) {
            for (var i = 0; i < questions.length; i++) {
                var question = questions[i];
                console.log(question);
                newQuestionButton(question["question_id"]);
            }
            evaluation = questions;
            generateSliderContent(questions, 0);
        }
    });
}
