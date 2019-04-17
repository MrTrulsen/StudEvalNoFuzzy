
//Function to add evaluations in the database
function addEvaluation(evaluation, courseName, btn) {
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
    console.log("Loading evalations...");
    fetch("/getEvaluations/62").then(function(response) {
        return response.json();
    }).then(function (evaluations) {
        console.log("Evaluation data: ", evaluations);
        if (Array.isArray(evaluations)) {
            for (var i = 0; i < evaluations.length; i++) {
                var evaluation = evaluations[i];
                console.log(evaluation);
                loadEvaluationCard(evaluation);
            }
        }
    });
}

function addQuestion(question, btn) {
  console.log("Adding question...");
  fetch("/addQuestion/1", {
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
            newQuestionButton();
            questionNumber++;

            removeInputValue(text);
            removeInputValue(difficulty);
            removeInputValue(complexity);
            removeInputValue(time_use);
            removeInputValue(importance);
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
                var questionToArray = Object.values(question);
                console.log(questionToArray);

                var questionId = questionToArray[0];
                var text = questionToArray[1];
                var difficulty = questionToArray[4];
                var complexity = questionToArray[2];
                var time = questionToArray[3];
                var importance = questionToArray[5];

                console.log(question);
                newQuestionButton(questionId);
            }
            generateSliderContent(questionId, text, difficulty, complexity, time, importance);
        }
    });
}
