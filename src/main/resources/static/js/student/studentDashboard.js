
var evalId;

window.addEventListener('load', function() {
    //Loads the available evaluations
    loadEvaluations();
});

//Adds an evaluation card at the dashboard based on the user input or when loaded into the dashboard
function addEvaluationCard(evaluation, courseName) {
    var course = evaluation["courseId"] + " - " + courseName; //TODO: Get course name from the database
    start = moment(evaluation["startDate"]).format('dddd / MMMM Do YYYY');
    end = moment(evaluation["stopDate"]).format('dddd / MMMM Do YYYY');

    generateEvaluationCard(evaluation["evalId"], start, end, course);
}

//Removes sets a evalId as a global variable to be used between documents
function setEvalId(btn) {
    var parentId = btn.parentElement.parentElement.id;
    console.log("Evalutaion ID: ", parentId);
    evalId = parentId;
    localStorage.setItem("evalId", evalId);
}