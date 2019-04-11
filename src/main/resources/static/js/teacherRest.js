
//Function to add evaluations in the database
function addEvaluation(evaluation, courseName, btn) {
  console.log("Adding evaluation...");
  fetch("/addEvaluation/" + courseName.value, {
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
