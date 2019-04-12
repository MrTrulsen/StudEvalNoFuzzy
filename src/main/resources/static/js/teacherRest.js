
//Function to add evaluations in the database
function addEvaluation(evaluation, courseName, btn) {
  console.log("Adding evaluation...");
  fetch("/addEvaluation/" + courseName, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(evaluation)
  }).then(function (response, courseName, btn) {
        btn = document.getElementById("saveEvaluationBtn"); //Temporary fix
        console.log("Response: ", response);

        if (response.status === 200) {
            btn.setAttribute("data-dismiss", "modal");
            addEvaluationCard(evaluation, courseName);

            removeInputValue(courseId);
            removeInputValue(courseName);
            removeInputValue(evalDates);
            removeInputValue(examTime);
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

function addQuestion(questionObject, btn) {
  console.log("Adding question...");
  fetch("/addQuestion/1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(questionObject)
  }).then(function (response, btn) {
        btn = document.getElementById('saveQuestionBtn'); //Temporary fix
        console.log("Response: ", response);

        if (response.status === 200) {
            btn.setAttribute("data-dismiss", "modal");
            addQuestionLabel(questionObject);
            questions.push(questionObject);
            newQuestionButton();
            questionNumber++;

            removeInputValue(question);
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
    }).then(function (questionObjects) {
        console.log("Evaluation data: ", questionObjects);
        if (Array.isArray(questionObjects)) {
            for (var i = 0; i < questionObjects.length; i++) {
                var questionObject = questionObjects[i];
                console.log(questionObject);
                loadQuestionButtons(questionObject);
            }
        }
    });
}
