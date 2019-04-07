//Cleans the input field for dates at adding evaluations
window.addEventListener('load', function() {
  removeInputValue(document.getElementById('evalDatesInput'));
})

//Adds a new evaluation by making a card with user input at the dashboard
function addEvaluation() {
  var courseId = document.getElementById("courseIdInput");
  var courseName = document.getElementById("courseNameInput");
  var course = courseId.value + " - " + courseName.value;

  var evalDates = document.getElementById('evalDatesInput');
  var btn = document.getElementById("saveEvaluationBtn")

  var evalDatesArray = evalDates.value.split(" - ", 2); //TODO: Change the split string to " / " when the formatting works
  var start = evalDatesArray[0];
  var end = evalDatesArray[1];

  var evalValues = [courseId.value, courseName.value, start, end];
  console.log(evalValues);

  start = moment(start).format('dddd / MMMM Do YYYY');
  end = moment(end).format('dddd / MMMM Do YYYY');

  removeElementsByClass("error");
  checkForError(courseId, courseName, start, end, btn);

  //Checks for error at user input
  function checkForError(courseId, courseName, start, end, btn) {
    //If length = 0 it will return an error message and not continue
    if (courseId.value.length == 0) {
      showErrorMessage("courseId", "The field can not be empty");
      btn.removeAttribute("data-dismiss", "modal");
    }

    else if (courseName.value.length == 0) {
      showErrorMessage("courseName", "The field can not be empty");
      btn.removeAttribute("data-dismiss", "modal");
    }

    else if (evalDates.value.length == 0) {
      showErrorMessage("evalDates", "The field can not be empty");
      btn.removeAttribute("data-dismiss", "modal");
    }

    else {
      addEvaluationCard(courseId.value, course, start, end);
      removeInputValue(courseId);
      removeInputValue(courseName);
      removeInputValue(evalDates);
      btn.setAttribute("data-dismiss", "modal");
    }
  }
}

//Generates a evaluation card at the dashboard based on the user input
function addEvaluationCard(courseId, course, start, end, closed) {
  var card = document.createElement("div");
  card.id = "evaluationCard" + courseId;
  card.className = "card text-center";

  generateCardContent("div", "card-header", "Open until: ", end);

  var cardBody = document.createElement("div");
  cardBody.className = "card-body";
  card.append(cardBody);

  generateCardContent2("h5", "card-title", course);
  generateCardContent2("p", "card-text", "With supporting text below as a natural lead-in to additional content.");
  generateBtn("seeEval", courseId, 1, "onclick", "location.href='#'", null, null, null, null, "See evaluation");
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
  var inputField = document.getElementById("removeEvaluation");
  var btn = document.getElementById("removeEvaluationBtn");

  removeElementsByClass("error");
  checkForError(inputField, btn);

  //Checks for error at user input
  function checkForError(inputField, btn) {
    //If length = 0 it will return an error message and not continue
    if (inputField.value.length == 0) {
      showErrorMessage("modalRemoveContent", "The field can not be empty");
      btn.removeAttribute("data-dismiss", "modal");
    }

    else {
      var action = document.getElementById("evaluationCard" + inputField.value);

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

//Prints out an error message to the user
function showErrorMessage(placement, text) {
  var errorPlacement = document.getElementById(placement);
  var errorMessage = document.createElement("div");

  errorMessage.className = "error";
  errorMessage.innerHTML = text;
  errorPlacement.append(errorMessage)
}

//Removes value inside input fields
function removeInputValue(element) {
  if(element.value.length > 0){
      element.value = "";
  }
}

//Removes the error messages
function removeErrorMessage() {
  var elements = document.getElementsByClassName("error");
}

//Removes elements by class name
function removeElementsByClass(className) {
  var elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

//TODO: Remove if not being used later in the project
function getCount(parent, getChildrensChildren){
    var relevantChildren = 0;
    var children = parent.childNodes.length;
    for(var i=0; i < children; i++){
        if(parent.childNodes[i].nodeType != 3){
            if(getChildrensChildren)
                relevantChildren += getCount(parent.childNodes[i],true);
            relevantChildren++;
        }
    }
    return relevantChildren;
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
