//Function to generate sliders and the content inside the evaluation document
function generateSliderContent(questions, questionIndex) {
  console.log(questions[questionIndex]);
  var questionDisplay = document.getElementById("questionDisplay");
  questionDisplay.innerHTML = "Question: " + questions[questionIndex]["question_id"];

  var questionText = document.getElementById("questionText");
  questionText.innerHTML = questions[questionIndex]["text"];

  var wrapper = document.createElement("div");
  wrapper.className = "container";
  wrapper.id = "sliderWrapper";

  var difficulty = questions[questionIndex]["difficulty"] * 100;
  var complexity = questions[questionIndex]["complexity"] * 100;
  var time = questions[questionIndex]["time"] * 100;
  var importance = questions[questionIndex]["importance"] * 100;

  generateSliders("difficulty", "Difficulty", difficulty);
  generateSliders("complexity", "Complexity", complexity);
  generateSliders("time", "Time", time);
  generateSliders("importance", "Importance", importance);

  document.getElementById("questionArea").appendChild(wrapper);

  //Function to generate sliders with input
  function generateSliders(type, headerText, input) {
    var valueToString = input.toString()

    var content = document.createElement("div");
    content.className = "container sliders";
    content.id = type + "Content";

    var header = document.createElement("h2");
    header.innerHTML = headerText;
    content.append(header);

    var slider = document.createElement("input");
    slider.id = type + "Slider";
    slider.className = "slider";
    slider.setAttribute("type", "range");
    slider.setAttribute("min", input - 10);
    slider.setAttribute("max", input + 10);
    slider.setAttribute("value", input);
    slider.setAttribute("onchange", "var slider = this; displaySliderValue(slider);");
    content.append(slider);

    var ticks = document.createElement("div");
    ticks.className = "sliderticks";
    ticks.id = type + "Ticks";
    content.append(ticks);

    var tickLow = document.createElement("p");
    tickLow.innerHTML = input - 10;
    ticks.append(tickLow);

    var tickMid = document.createElement("p");
    tickMid.innerHTML = input;
    ticks.append(tickMid);

    var tickHigh = document.createElement("p");
    tickHigh.innerHTML = input + 10;
    ticks.append(tickHigh);

    var value = document.createElement("p");
    value.innerHTML = "Value: ";
    content.append(value);

    var valueInput = document.createElement("input");
    valueInput.className = "form-control valueOutput";
    valueInput.id = type + "Output";
    valueInput.setAttribute("type", "text");
    valueInput.setAttribute("value", valueToString);
    valueInput.setAttribute("onchange", "var output = this; updateSlider(output)");
    value.append(valueInput);

    wrapper.appendChild(content);
  }
}

//Makes a button for each individual question
function newQuestionButton(questionId) {
  console.log(questionId);
  var placement = document.getElementById("footer")
  var btn = document.createElement("button");
  var questionIndex = questionId - 1;

  console.log("Question number: ", questionId);
  btn.innerHTML = questionId;

  btn.addEventListener('click', function() {
    showQuestion(evaluation, questionIndex);
  }, false);

  placement.appendChild(btn);
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
