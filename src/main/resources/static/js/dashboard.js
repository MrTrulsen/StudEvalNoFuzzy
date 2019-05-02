

window.addEventListener('load', function() {
  //Loads the available evaluations
  loadEvaluations();
  //Cleans the input field for dates at adding evaluations
})

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
  getLoginEmail();

  console.log(email);

  removeElementsByClass("error");
  checkForErrorInAddEvaluation(evaluation, courseId, courseName, evalDates, examTime, btn, email);
}

//Adds an evaluation card at the dashboard based on the user input or when loaded into the dashboard
function addEvaluationCard(evaluation, courseName) {
  var course = evaluation["courseId"] + " - " + courseName; //TODO: Get course name from the database
  start = moment(evaluation["startDate"]).format('dddd / MMMM Do YYYY');
  end = moment(evaluation["stopDate"]).format('dddd / MMMM Do YYYY');

  generateEvaluationCard(evaluation["courseId"], start, end, course);
}

//Removes a evaluation when user press on the remove button inside the card
function removeEvaluationFromDashboard() {
  var courseId = document.getElementById("removeCourseIdInput").value;
  var date = document.getElementById("removeDateInput").value;
  var btn = document.getElementById("removeEvaluationBtn");

  removeElementsByClass("error", "success");
  checkForError(courseId, date, btn);

  //Checks for error at user input
  function checkForError(courseIdInput, dateInput, btn) {
    //If length = 0 it will return an error message and not continue
    if (courseId.length === 0) {
      showErrorMessage("removeCourseId", "The field can not be empty");
      btn.removeAttribute("data-dismiss", "modal");
    }

    else if (date.length === 0) {
      showErrorMessage("deleteDate", "The field can not be empty");
      btn.removeAttribute("data-dismiss", "modal");
    }

    else {
      deleteEvaluation(courseId);

      //var action = document.getElementById("evaluationCard" + courseIdInput);

      //if (action === null) {
      //  showErrorMessage("modalRemoveContent", "Please enter the correct value");
      //  btn.removeAttribute("data-dismiss", "modal");
      //}

      //else {
      //  action.parentNode.removeChild(action);
      //  btn.setAttribute("data-dismiss", "modal");
      //}
    }
  }
}

function formatToInputField(start, end) {
  //TODO: Change the formatting to " / " and get it to work
  var dates = document.getElementById("datesInput");
  var format = start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD');
  dates.value = format;
}

//This is used to initialize the datepicker provided in the modal for adding evaluations
$(function() {

    var start = moment();
    var end = moment();

    $('input[name="addEval"]').daterangepicker({
        startDate: start,
        endDate: start, //TODO: Plus some days (Max 1 week)
        minDate: moment(),
        maxDate: moment().add(6, 'month'),
        locale: {
          format: 'YYYY-MM-DD'
        }
    }, formatToInputField);

    formatToInputField(start, end);
});

//This is used to initialize the datepicker provided in the modal for deleting evaluations
$(function() {

  var start = moment();

  $('input[name="removeEval"]').daterangepicker({
    startDate: start,
    singleDatePicker: true,
    locale: {
      format: 'YYYY-MM-DD'
    }
  });
});