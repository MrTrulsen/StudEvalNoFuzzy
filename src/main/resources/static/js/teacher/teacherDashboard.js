
var evalId;
var answers = [];
var questions = [];

window.addEventListener('load', async function() {
    const user = await getCurrentUser();
    console.log(currentUser);
    generateCurrentUserDisplay(currentUser);

    //Loads the available evaluations
    loadEvaluations();
});

//Adds a new evaluation by making a card with user input at the dashboard
function generateEvaluation() {
    var courseId = document.getElementById("courseIdInput").value;
    var courseName = document.getElementById("courseNameInput").value;

    var evalDates = document.getElementById('datesInput').value;
    var examTime = document.getElementById('examTimeInput').value;
    var btn = document.getElementById("saveEvaluationBtn");

    var evalDatesArray = evalDates.split(" - ", 2); //TODO: Change the split string to " / " when the formatting works
    var start = evalDatesArray[0];
    var end = evalDatesArray[1];

    var evaluation = {
        courseId: courseId,
        startDate: start,
        stopDate: end,
        timeOfExam: examTime
    };

    console.log(evaluation);

    removeElementsByClass("error", "success");
    checkForErrorInAddEvaluation(evaluation, courseId, courseName, evalDates, examTime, btn);
}

//Adds an evaluation card at the dashboard based on the user input or when loaded into the dashboard
function addEvaluationCard(evaluation, courseName) {
    var course = evaluation["courseId"] + " - " + courseName;
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

function formatToInputField(start, end) {
    //TODO: Change the formatting to " / " and get it to work
    var dates = document.getElementById("datesInput");
    dates.value = start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD');
}

//This is used to initialize the datepicker provided in the modal for adding evaluations
$(function() {

    var start = moment();
    var end = moment();

    $('input[name="addEval"]').daterangepicker({
        startDate: start,
        endDate: start, //TODO: Plus some days (Max 1 week)
        minDate: moment(),
        maxDate: moment().add(1, 'month'),
        locale: {
            format: 'YYYY-MM-DD'
        }
    }, formatToInputField);

    formatToInputField(start, end);
});