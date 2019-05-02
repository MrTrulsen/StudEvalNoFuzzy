
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

                    //TODO: Use this in studentDashboard instead of teacherDashboard
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