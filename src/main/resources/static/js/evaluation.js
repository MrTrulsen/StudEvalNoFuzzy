
var questions = [];

var questionNumber = 1;

function questionValue(question) {
  var complexity = document.getElementById('complexityInput').value;
  var time_use = document.getElementById('timeInput').value;
  var difficulty = document.getElementById('difficultyInput').value;
  var importance = document.getElementById('importanceInput').value;

  var q1 = [question, difficulty, complexity, time_use, importance];
  var newQuestion = questions.push(q1);
  console.log(time_use);
  console.log(questions);
}

function showQuestion(index) {
  document.getElementById("questionText").innerHTML = questions[index][0];
}

function addQuestion() {
  var txt;

  var question = document.getElementById("questionInput").value; //= prompt("Please enter Question " + questionNumber + " : ", "");
  if (question == null || question == "") {
    txt = " User didnt put in a Question.";

  }
  else {
    var btn = document.getElementById("saveQuestionBtn");
    btn.setAttribute("data-dismiss", "modal")
    txt = question;
    newQuestionButton();
    questionValue(question);
    questionNumber++;
  }

  document.getElementById("questionText").innerHTML = txt;
}

function newQuestionButton() {

  console.log(questionNumber);
  var newButton = document.createElement("button");
  newButton.innerHTML = questionNumber;
  var questionIndex = questionNumber - 1;
  newButton.addEventListener('click', function() {
    showQuestion(questionIndex);
  }, false);

  document.body.appendChild(newButton);
}
function importValue(input){
  console.log(input);
    var slider = document.getElementById(input.id.slice(0, - 5) + "Slider");
    var output = document.getElementById(input.id.slice(0, - 5) + "Output");
     slider.value = input.value;
     output.value = input.value;
console.log(slider);
console.log(input);
console.log(output);
}

function displaySliderValue(slider) {
  var output = document.getElementById(slider.id.slice(0, - 6) + "Output");
  output.value = slider.value;
}

function updateSlider(output) {
  var slider = document.getElementById(output.id.slice(0, - 6) + "Slider");
  slider.value = output.value;
}
