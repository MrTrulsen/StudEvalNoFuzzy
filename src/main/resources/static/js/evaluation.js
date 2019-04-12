
window.addEventListener('load', function() {
  //Loads the available evaluations
  loadQuestions();
})

var questions = [];
var questionNumber = 1;

function generateQuestion() {
  var text = document.getElementById('questionInput').value;
  var difficulty = document.getElementById('difficultyInput').value;
  var complexity = document.getElementById('complexityInput').value;
  var time = document.getElementById('timeInput').value;
  var importance = document.getElementById('importanceInput').value;
  var btn = document.getElementById('saveQuestionBtn');

  var question = {
    text: text,
    difficulty: difficulty,
    complexity: complexity,
    time: time,
    importance: importance
  };

  console.log(question);

  removeElementsByClass("error");
  checkForError(text, complexity, time, difficulty, importance, btn);

  function checkForError(text, complexity, time, difficulty, importance, btn) {
    //If length = 0 it will return an error message and not continue
    if (text.length == 0) {
      showErrorMessage("question", "The field can not be empty");
      btn.removeAttribute("data-dismiss", "modal");
    }

    else if (difficulty.length == 0) {
      showErrorMessage("difficulty", "The field can not be empty");
      btn.removeAttribute("data-dismiss", "modal");
    }
    //Checks if the input fields exceeds the maximum value
    else if (difficulty > 100) {
      showErrorMessage("difficulty", "This value can not exceed a total of 100");
      btn.removeAttribute("data-dismiss", "modal");
    }

    else if (complexity.length == 0) {
      showErrorMessage("complexity", "The field can not be empty");
      btn.removeAttribute("data-dismiss", "modal");
    }

    else if (complexity > 100) {
      showErrorMessage("complexity", "This value can not exceed a total of 100");
      btn.removeAttribute("data-dismiss", "modal");
    }

    else if (time.length == 0) {
      showErrorMessage("time", "The field can not be empty");
      btn.removeAttribute("data-dismiss", "modal");
    }

    else if (time > 100) {
      showErrorMessage("time", "This value can not exceed a total of 100");
      btn.removeAttribute("data-dismiss", "modal");
    }

    else if (importance.length == 0) {
      showErrorMessage("importance", "The field can not be empty");
      btn.removeAttribute("data-dismiss", "modal");
    }

    else if (importance > 100) {
      showErrorMessage("importance", "This value can not exceed a total of 100");
      btn.removeAttribute("data-dismiss", "modal");
    }

    else {
      addQuestion(question, btn);
    }
  }
}

function newQuestionButton() {
  var placement = document.getElementById("footer")
  var btn = document.createElement("button");
  var questionIndex = questionNumber - 1;

  console.log("Question number: ", questionNumber);
  btn.innerHTML = questionNumber;

  btn.addEventListener('click', function() {
    showQuestion(questionIndex);
  }, false);

  placement.appendChild(btn);
}

function loadQuestionButtons(question) {
  var questionToArray = Object.values(question);
  console.log(questionToArray);

  var text = questionToArray[1];
  var difficulty = questionToArray[4];
  var complexity = questionToArray[2];
  var time = questionToArray[3];
  var importance = questionToArray[5];

  document.getElementById("questionText").innerHTML = text;
  document.getElementById("difficultyOutput").value = difficulty;
  document.getElementById("complexityOutput").value = complexity;
  document.getElementById("timeOutput").value = time;
  document.getElementById("importanceOutput").value = importance;
}

function importValue(input) {
  var slider = document.getElementById(input.id.slice(0, - 5) + "Slider");
  var output = document.getElementById(input.id.slice(0, - 5) + "Output");
  slider.value = input.value;
  output.value = input.value;
}

function displaySliderValue(slider) {
  var output = document.getElementById(slider.id.slice(0, - 6) + "Output");
  output.value = slider.value;
}

function updateSlider(output) {
  var slider = document.getElementById(output.id.slice(0, - 6) + "Slider");
  slider.value = output.value;
}
