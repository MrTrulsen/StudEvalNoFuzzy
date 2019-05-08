
// Loads evaluations from the database
function loadEvaluations() {
    console.log("Loading evaluations...");
    fetch("/getEvaluations/").then(function(response) {
        return response.json();
    })
        .then(async function (evaluations) {
        console.log("Evaluation data: ", evaluations);

        if (Array.isArray(evaluations)) {
            for (var i = 0; i < evaluations.length; i++) {
                var evaluation = evaluations[i];
                const courseName = await getCourseName(evaluation["courseId"]);
                console.log(evaluation);

                if (isStudent === true) {
                    if (evaluation["stopDate"] < moment().format('YYYY-MM-DD')) {
                        addEvaluationCard(evaluation, returnString, "Expired", true);
                    }

                    else if (evaluation["startDate"] > moment().format('YYYY-MM-DD')){
                        addEvaluationCard(evaluation, returnString, "Opening soon", true);
                    }

                    else {
                        addEvaluationCard(evaluation, returnString, "Take evaluation", false);
                    }
                }

                else {
                    addEvaluationCard(evaluation, returnString);
                }

            }
        }
    });
}

// Loads questions from the database
function loadQuestions(insideEvaluation) {
    console.log("Loading questions in evalID: " + evalId + "...");
    fetch("/getQuestionsInEval/" + evalId).then(function(response) {
        return response.json();
    })
        .then(function (questions) {
            console.log("Questions: ", questions);

            if (Array.isArray(questions)) {
                for (var i = 0; i < questions.length; i++) {
                    var question = questions[i];
                    console.log(question);
                    this.questions = questions;
                }

                // This will only be true if you are loading questions inside an evaluation
                if (insideEvaluation === true) {
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
            }
        });
}

// Adds evaluations in the database
function changePassword(oldPassword, newPassword) {
    console.log("Changing password...");
    fetch("/changePassword/" + oldPassword + "/" + newPassword, {
        method: "POST"
    })
        .then(function (response) {
            console.log("Response: ", response);

            if (response.status === 200) {
                removeElement("passwordInputPlacement");
            }

            else {
                showErrorMessage("changePassword", "Error when trying to change password. Please try again.");
                return response.text();
            }
        });
}

// Deletes a question from the database
function deleteUser() {
    //TODO: Get userId
    console.log("Deleting user: ");
    fetch("/deleteUser/" , {method: "DELETE"})
        .then(function (response) {
            console.log("Response: ", response);

            if (response.status === 200) {
                window.location.reload();
            }

            else {
                showErrorMessage("modalDeleteQuestionBody", "Error when trying to delete question. Please try again.");
                return response.text();
            }
        });
}

var currentUser = "";
// Gets current user from the database
async function getCurrentUser() {
    console.log("Getting current user...");
    await fetch("/getCurrentUser/").then(async function(response) {
           const name = await response.text();
           console.log("Current user: ", name);
           currentUser = name;
           return name;
            });
}

var returnString = "";
// Gets courseName from the database
async function getCourseName(courseId) {
    console.log("Getting courseName...");
     await fetch("/getNameOfCourse/" + courseId).then(async function (response) {
        const json = await response.text();
        console.log(json);
        returnString = json;
        return json;
    });
}