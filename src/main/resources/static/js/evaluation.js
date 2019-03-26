
var questions = [];

var questionNumber = 1;

function questionValue(question) {
  var complexity = document.getElementById('difficultyOutput').value;
  var time_use = document.getElementById('timeOutput').value;
  var difficulty = document.getElementById('difficultyOutput').value;
  var importance = document.getElementById('importanceOutput').value;

  var q1 = [question, complexity, time_use, difficulty, importance];
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

function displaySliderValue(slider) {
  var output = document.getElementById(slider.id.slice(0, - 6) + "Output");
  output.value = slider.value;
}

function updateSlider(output) {
  var slider = document.getElementById(output.id.slice(0, - 6) + "Slider");
  slider.value = output.value;
}
