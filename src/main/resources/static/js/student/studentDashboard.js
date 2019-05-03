
window.addEventListener('load', function() {
    //Loads the available evaluations
    loadEvaluations();
});

//Adds an evaluation card at the dashboard based on the user input or when loaded into the dashboard
function addEvaluationCard(evaluation, courseName) {
    var course = evaluation["courseId"] + " - " + courseName; //TODO: Get course name from the database
    start = moment(evaluation["startDate"]).format('dddd / MMMM Do YYYY');
    end = moment(evaluation["stopDate"]).format('dddd / MMMM Do YYYY');

    generateEvaluationCard(evaluation["courseId"], start, end, course);
}