
var isStudent = false;

// Used for graph printing
var answers = [];
var questions = [];



// Adds a new evaluation by making a card with user input at the dashboard
function generateEvaluation() {
    var courseId = document.getElementById("courseIdInput");
    var courseName = document.getElementById("courseNameInput");

    var evalDates = document.getElementById('datesInput');
    var examTime = document.getElementById('examTimeInput');

    var evalDatesArray = evalDates.value.split(" - ", 2);
    var start = evalDatesArray[0];
    var end = evalDatesArray[1];

    var evaluation = {
        courseId: courseId.value,
        startDate: start.value,
        stopDate: end.value,
        timeOfExam: examTime.value
    };

    console.log(evaluation);
    checkForErrorInAddEvaluation(evaluation, courseId, courseName, evalDates, examTime);
}

// This is used to initialize the datepicker provided in the modal for adding evaluations
$(function() {

    var start = moment();
    var end = moment();

    $('input[name="addEval"]').daterangepicker({
        startDate: start,
        endDate: start,
        minDate: moment(),
        maxDate: moment().add(1, 'month'),
        locale: {
            format: 'YYYY-MM-DD'
        }
    });
});