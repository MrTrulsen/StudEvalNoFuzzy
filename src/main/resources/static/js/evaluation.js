
var questions = [];

var questionNumber = 1;

function questionValue(question) {
  var complexity = 0.25;
  var time_use = document.getElementById('difficultySlider').value;
  var difficulty = 0.25;
  var importance = 0.25;

  var q1 = [question, complexity, time_use, difficulty, importance];
  var newQuestion = questions.push(q1);
  console.log(time_use);
  console.log(questions);
}

function addQuestion() {
  console.log(questions);
}

function showQuestion(index) {
  document.getElementById("questionText").innerHTML = questions[index][0];
}

function enterQuestion() {
  var txt;

  var question = prompt("Please enter Question " + questionNumber + " : ", "");
  if (question == null || question == "") {
    txt = " User didnt put in a Question.";

  } else {
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

function addQuestion() {
  console.log(questions);
}

function displaySliderValue() {
  var slider = document.getElementById("difficultySlider");
  var output = document.getElementById("difficultyOutput");
  output.value = slider.value;
}

function updateSlider() {
  var slider = document.getElementById("difficultySlider");
  var output = document.getElementById("difficultyOutput");
  slider.value = output.value;
}
