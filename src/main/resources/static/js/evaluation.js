
window.addEventListener('load', function() {
  //Loads the available evaluations
  loadQuestions();
});

var evaluation;
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
    if (text.length === 0) {
      showErrorMessage("question", "The field can not be empty");
      btn.removeAttribute("data-dismiss", "modal");
    }

    else if (difficulty.length === 0) {
      showErrorMessage("difficulty", "The field can not be empty");
      btn.removeAttribute("data-dismiss", "modal");
    }
    //Checks if the input fields exceeds the maximum value
    else if (difficulty > 100) {
      showErrorMessage("difficulty", "This value can not exceed a total of 100");
      btn.removeAttribute("data-dismiss", "modal");
    }

    else if (complexity.length === 0) {
      showErrorMessage("complexity", "The field can not be empty");
      btn.removeAttribute("data-dismiss", "modal");
    }

    else if (complexity > 100) {
      showErrorMessage("complexity", "This value can not exceed a total of 100");
      btn.removeAttribute("data-dismiss", "modal");
    }

    else if (time.length === 0) {
      showErrorMessage("time", "The field can not be empty");
      btn.removeAttribute("data-dismiss", "modal");
    }

    else if (time > 100) {
      showErrorMessage("time", "This value can not exceed a total of 100");
      btn.removeAttribute("data-dismiss", "modal");
    }

    else if (importance.length === 0) {
      showErrorMessage("importance", "The field can not be empty");
      btn.removeAttribute("data-dismiss", "modal");
    }

    else if (importance > 100) {
      showErrorMessage("importance", "This value can not exceed a total of 100");
      btn.removeAttribute("data-dismiss", "modal");
    }

    else {
      addQuestion(question);
    }
  }
}

function showQuestion(evaluation, questionIndex) {
  console.log(evaluation);
  console.log(questionIndex);
  removeElement("sliderWrapper");
  generateSliderContent(evaluation, questionIndex);
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