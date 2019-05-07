
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
        console.log("Response: ", response);

        if (response.status === 200) {
            console.log(evaluation);
            showSuccessMessage("modalAddEvalBody", "Evaluation successfully added");
            setTimeout(function(){
                window.location.reload();
                }, 500);

        }

        else {
            showErrorMessage("modalAddEvalBody", "Error when trying to add evaluation. Please try again.");setTimeout(function(){
                removeElementsByClass("error", "success")
            }, 1000);
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
        console.log("Response: ", response);

        if (response.status === 200) {
            console.log(questions);
            showSuccessMessage("modalAddQuestionBody", "Question successfully added");
            setTimeout(function(){
                window.location.reload();
            }, 500);

        } else {
            showErrorMessage("modalAddQuestionBody", "Error when trying to add question. Please try again.");
            setTimeout(function(){
                removeElementsByClass("error", "success")
            }, 1000);
            return response.text();
        }
    });
}

//Saves the current question to the database
function saveQuestion(question) {
    console.log("Saving question...");
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
                console.log(question);
                showSuccessMessage("controlPanelBody", "Question successfully saved");
                setTimeout(function(){
                    removeElementsByClass("error", "success")
                }, 500);
            }

            else {
                showErrorMessage("controlPanelBody", "Error when trying to save question. Please try again.");
                setTimeout(function(){
                    removeElementsByClass("error", "success")
                }, 1000);
                return response;
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
        console.log("Response: ", response);

        if (response.status === 200) {
            showSuccessMessage("modalRemoveEvalBody", "Evaluation successfully deleted");
            setTimeout(function(){
                window.location.reload();
            }, 500);
        }

        else {
            showErrorMessage("modalRemoveEvalBody", "Error when trying to add question. Please try again.");
            setTimeout(function(){
                removeElementsByClass("error", "success")
            }, 1000);
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
        console.log("Response: ", response);
        
        if (response.status === 200) {
            showSuccessMessage("modalDeleteQuestionBody", "Question successfully deleted");
            setTimeout(function(){
                window.location.reload();
            }, 500);
        }

        else {
            showErrorMessage("modalDeleteQuestionBody", "Error when trying to delete question. Please try again.");
            setTimeout(function(){
                removeElementsByClass("error", "success")
            }, 1000);
            return response.text();
        }
    });
}