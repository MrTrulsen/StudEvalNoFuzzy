
window.addEventListener('load', function() {
  //Loads the available evaluations
  loadEvaluations();
  //Cleans the input field for dates at adding evaluations
  removeInputValue(document.getElementById('evalDatesInput'));
})

//Adds a new evaluation by making a card with user input at the dashboard
function generateEvaluation() {
  var courseId = document.getElementById("courseIdInput").value;
  var courseName = document.getElementById("courseNameInput").value;

  var evalDates = document.getElementById('evalDatesInput').value;
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

  removeElementsByClass("error");
  checkForError(courseId, courseName, start, end, btn);

  //Checks for error at user input
  function checkForError(courseId, courseName, start, end, btn) {
    //If length = 0 it will return an error message and not continue
    if (courseId.length == 0) {
      showErrorMessage("courseId", "The field can not be empty");
      btn.removeAttribute("data-dismiss", "modal");
    }

    else if (courseName.length == 0) {
      showErrorMessage("courseName", "The field can not be empty");
      btn.removeAttribute("data-dismiss", "modal");
    }

    else if (evalDates.length == 0) {
      showErrorMessage("evalDates", "The field can not be empty");
      btn.removeAttribute("data-dismiss", "modal");
    }

    else if (examTime.length == 0) {
      showErrorMessage("examTime", "The field can not be empty");
      btn.removeAttribute("data-dismiss", "modal");
    }

    else {
      addEvaluation(evaluation, courseName, btn);
    }
  }
}

//Adds an evaluation card at the dashboard based on the user input
function addEvaluationCard(evaluation, courseName) {
  var evaluationToArray = Object.values(evaluation);
  console.log(evaluationToArray);

  var courseId = evaluationToArray[0];
  var start = evaluationToArray[1];
  var end = evaluationToArray[2];

  var course = courseId + " - " + courseName;

  start = moment(start).format('dddd / MMMM Do YYYY');
  end = moment(end).format('dddd / MMMM Do YYYY');

  generateEvaluationCard(courseId, start, end, course);
}

//Gets an evaluation card when loading the dashboard
function loadEvaluationCard(evaluation) {
  var evaluationToArray = Object.values(evaluation);
  console.log(evaluationToArray);

  var courseId = evaluationToArray[3];
  var start = evaluationToArray[1];
  var end = evaluationToArray[2];

  var course = courseId + " - " + courseName;

  start = moment(start).format('dddd / MMMM Do YYYY');
  end = moment(end).format('dddd / MMMM Do YYYY');

  generateEvaluationCard(courseId, start, end, course);
}

//Generates a evaluation card at the dashboard based on the user input
function generateEvaluationCard(courseId, start, end, course) {
  var card = document.createElement("div");
  card.id = "evaluationCard" + courseId;
  card.className = "card text-center";

  generateCardContent("div", "card-header", "Open until: ", end);

  var cardBody = document.createElement("div");
  cardBody.className = "card-body";
  card.append(cardBody);

  generateCardContent2("h5", "card-title", course);
  generateCardContent2("p", "card-text", "With supporting text below as a natural lead-in to additional content.");
  generateBtn("editEval", courseId, 1, "onclick", "location.href='/teacherpage/evaluation'", null, null, null, null, "See evaluation");
  generateBtn("result", courseId, 2, "data-toggle", "modal", "data-target", "#modalResult", null, null, "Result");
  generateBtn("remove", courseId, 2, "data-toggle", "modal", "data-target", "#modalRemove", "onclick", "var element = document.getElementById('removeEvaluation'); removeInputValue(element)", "Remove");
  generateCardContent("div", "card-footer text-muted", "Opened: ", start);

  document.getElementById("cardArea").appendChild(card);

  //Generates buttons
  function generateBtn(type, courseId, numOfAttributes, attribute, data, attribute2, data2, attribute3, data3, text) {
    var btn = document.createElement("button");
    btn.id = type + "btn" + courseId;
    btn.className = "btn btn-primary evalBtn";
    btn.setAttribute(attribute, data);
    btn.setAttribute(attribute2, data2);
    btn.setAttribute(attribute3, data3);
    btn.type = "submit";
    btn.innerText = text;
    cardBody.append(btn);
}

  //Generates content inside the cards with date
  function generateCardContent(element, className, innerHtml, date) {
    var content = document.createElement(element);
    content.className = className;
    content.innerHTML = innerHtml + date;
    card.append(content);
  }

  //Generates content inside the cards
  function generateCardContent2(element, className, innerHtml) {
    var content = document.createElement(element);
    content.className = className;
    content.innerHTML = innerHtml;
    cardBody.append(content);
  }
}

//Removes a evaluation when user press on the remove button inside the card
function removeEvaluation() {
  var inputField = document.getElementById("removeEvaluation").value;
  var btn = document.getElementById("removeEvaluationBtn");

  removeElementsByClass("error");
  checkForError(inputField, btn);

  //Checks for error at user input
  function checkForError(inputField, btn) {
    //If length = 0 it will return an error message and not continue
    if (inputField.length == 0) {
      showErrorMessage("modalRemoveContent", "The field can not be empty");
      btn.removeAttribute("data-dismiss", "modal");
    }

    else {
      var action = document.getElementById("evaluationCard" + inputField);

      if (action == null) {
        showErrorMessage("modalRemoveContent", "Please enter the correct value");
        btn.removeAttribute("data-dismiss", "modal");
      }

      else {
        action.parentNode.removeChild(action);
        btn.setAttribute("data-dismiss", "modal");
      }
    }
  }
}

function formatToInputField(start, end) {
  //TODO: Change the formatting to " / " and get it to work
  var courseId = document.getElementById("courseIdInput");
  var evalDatesInput = document.getElementById("evalDatesInput");
  var format = start.format('YYYY-MM-DD') + ' - ' + end.format('YYYY-MM-DD');
  evalDatesInput.value = format;
}

$(function() {

    var start = moment();
    var end = moment();

    $('input[name="datetimeEval"]').daterangepicker({
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
