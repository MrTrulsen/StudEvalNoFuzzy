
// Adds evaluations in the database
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
            window.location.reload();
        }

        else {
            showErrorMessage("modalAddEvalBody", "Error when trying to add evaluation. Please try again.");
            return response.text();
        }
    });
}

// Adds questions to the database
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
            window.location.reload();

        } else {
            showErrorMessage("modalAddQuestionBody", "Error when trying to add question. Please try again.");
            return response.text();
        }
    });
}

// Adds students to the database
function addStudents(arrayOfStudents, evalId) {
    console.log("Adding student...");
    fetch("/addStudents/" + evalId ,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(arrayOfStudents)
    })
        .then(function (response) {
            console.log("Response: ", response);

            if (response.status === 200) {
                showSuccessMessage("modalAddStudentBody", "User successfully added");
                $('#modalAddStudent').modal('toggle');
            }

            else if(response.status === 400){
                showErrorMessage("modalAddStudentBody", "Student already exists or wrong type of mail. Must end with @stud.ntnu.no");
            }

            else {
                showErrorMessage("modalAddStudentBody", "Error when trying to add student. Please try again.");
                return response.text();
            }
        });
}

// Saves the current question to the database
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
            }

            else {
                showErrorMessage("controlPanelBody", "Error when trying to save question. Please try again.");
                return response;
            }
        });
}

// Loads answers from an evaluation
function loadAnswers() {
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

// Deletes an evaluation from the database
function deleteEvaluation() {
    console.log("Deleting evaluation: ", evalId);
    fetch("/deleteEvaluation/" + evalId, {
        method: "DELETE"
    })
        .then(function (response) {
        console.log("Response: ", response);

        if (response.status === 200) {
            showSuccessMessage("modalRemoveEvalBody", "Evaluation successfully deleted");
                window.location.reload();
        }

        else {
            showErrorMessage("modalRemoveEvalBody", "Error when trying to add question. Please try again.");
            return response.text();
        }
    });
}

// Deletes a question from the database
function deleteQuestion(questionId) {
    console.log("Deleting evaluation: ", questionId);
    fetch("/deleteQuestion/" + questionId, {
        method: "DELETE"
    })
        .then(function (response) {
        console.log("Response: ", response);
        
        if (response.status === 200) {
            showSuccessMessage("modalDeleteQuestionBody", "Question successfully deleted");
            window.location.reload();
        }

        else {
            showErrorMessage("modalDeleteQuestionBody", "Error when trying to delete question. Please try again.");
            return response.text();
        }
    });
}