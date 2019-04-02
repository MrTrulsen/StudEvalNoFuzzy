//Adds a new evaluation by making a card with user input at the dashboard
function addEvaluation() {
  var courseId = document.getElementById("courseIdInput").value;
  var courseName = document.getElementById("courseNameInput").value;
  var course = courseId + " - " + courseName;

  var date = document.getElementById("dateInput").value;
  var month = document.getElementById("monthInput").value;
  var year = document.getElementById("yearInput").value;

  var closed;
  var opened;
  dateFormat(date, month, year);
  addEvaluationCard(courseId, course, opened, closed);

  function dateFormat(date, month, year) {
    var headerDate = month.concat(" ").concat(Number(parseInt(date) + 1)).concat(" ").concat(year);
    var footerDate = month.concat(" ").concat(date.concat(" ")).concat(year);
    var format = "MMM Do YYYY";

    closed = moment(headerDate, format).format(format);
    opened = moment(footerDate, format).format(format);
  }
}

//Generates a evaluation card at the dashboard based on the user input
function addEvaluationCard(courseId, course, opened, closed) {
  var card = document.createElement("div");
  card.id = "evaluationCard" + courseId;
  card.className = "card text-center";

  generateCardContent("div", "card-header", "Open until: ", closed);

  var cardBody = document.createElement("div");
  cardBody.className = "card-body";
  card.append(cardBody);

  generateCardContent2("h5", "card-title", course);
  generateCardContent2("p", "card-text", "With supporting text below as a natural lead-in to additional content.");
  generateBtn("seeEval", courseId, 1, "onclick", "location.href='#'", null, null, null, null, "See evaluation");
  generateBtn("result", courseId, 2, "data-toggle", "modal", "data-target", "#modalResult", null, null, "Result");
  generateBtn("remove", courseId, 2, "data-toggle", "modal", "data-target", "#modalRemove", "onclick", "removeErrorMessage()", "Remove");
  generateCardContent("div", "card-footer text-muted", "Opened: ", opened);

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
  var inputValue = document.getElementById("removeEvaluation").value;
  var inputField = document.getElementById("removeEvaluation");
  var btn = document.getElementById("removeEvaluationBtn");

  checkForError(inputValue, inputField, btn);

  //Checks for error at user input
  function checkForError(inputValue, inputField, btn) {
    //If length = 0 it will return an error message and not continue
    if (inputValue.length == 0) {
      showErrorMessage(inputField, "modalRemoveBody", "modalRemoveContent", "The field can not be empty");
      btn.removeAttribute("data-dismiss", "modal");
    }
    else {
      var action = document.getElementById("evaluationCard" + inputValue);
      if (action == null) {
        showErrorMessage(inputField, "modalRemoveBody", "modalRemoveContent", "Please enter the correct value");
        btn.removeAttribute("data-dismiss", "modal");
      }
      else {
        action.parentNode.removeChild(action);
        btn.setAttribute("data-dismiss", "modal");
      }
    }
  }
}

//Shows error message
function removeErrorMessage() {
  document.getElementById("removeEvaluation").classList.remove("is-invalid");
}

//Prints out an error message to the user
function showErrorMessage(inputField, element, error, text) {
  var feedback = document.getElementById(error);
  var errorMessage = document.createElement("div");
  var body = document.getElementById(element);

  removeElementsByClass("invalid-feedback");
  inputField.classList.add("is-invalid");
  body.classList.add("is-invalid");

  errorMessage.className = "invalid-feedback";
  errorMessage.innerHTML = text;
  feedback.append(errorMessage);
}

//Removes elements by class name
function removeElementsByClass(className) {
  var elements = document.getElementsByClassName("invalid-feedback");
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
