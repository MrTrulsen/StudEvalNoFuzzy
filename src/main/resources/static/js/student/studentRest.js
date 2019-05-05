
//Loads evaluations from the database
function loadEvaluations() {
    console.log("Loading evaluations...");
    fetch("/getEvaluations/").then(function(response) {
        return response.json();
    })
        .then(function (evaluations) {
            console.log("Evaluation data: ", evaluations);

            if (Array.isArray(evaluations)) {
                for (var i = 0; i < evaluations.length; i++) {
                    var evaluation = evaluations[i];
                    console.log(evaluation);

                    if (evaluation["stopDate"] < moment().format('YYYY-MM-DD')) {
                        console.log(evaluation["courseId"] + " expired at date " + evaluation["stopDate"]);
                    }

                    else {
                        console.log("Evaluation data: ", "courseName");
                        addEvaluationCard(evaluation, "courseName");
                    }
                }
            }
        });
}

//Loads questions from the database
function loadQuestions() {
    console.log("Loading questions...");
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

//Adds answers to the evaluation in the database
function submitAnswers(evalId) {
    console.log("Adding answers to the backend...");
    fetch("/addAnswers/" + evalId, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(evalId)
    })
        .then(function (response) {
            console.log("Response: ", response);

            if (response.status === 200) {

            }

            else {

                return response.text();
            }
        });
}