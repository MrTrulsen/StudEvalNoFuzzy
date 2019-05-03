
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
    fetch("/getQuestionsInEval/1").then(function(response) {
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
                    console.log("There are " + questions.length + " questions in this evaluation");
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