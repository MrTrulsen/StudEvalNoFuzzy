
var questions = [];
var questionIndex;

window.addEventListener('load', function() {
    const user = await getCurrentUser();
    console.log(currentUser);
    generateCurrentUserDisplay(currentUser);

    //Gets the stored evalId and sets it as a global variable
    evalId = localStorage.getItem("evalId");

    //Loads the available questions
    loadQuestions();
});

//Generates a question based on user input
function generateQuestion() {
    var text = document.getElementById('textInput').value;
    var difficulty = document.getElementById('difficultyInput').value;
    var complexity = document.getElementById('complexityInput').value;
    var time = document.getElementById('timeInput').value;
    var importance = document.getElementById('importanceInput').value;
    var btn = document.getElementById('saveQuestionBtn');

    var question = {
        text: text,
        difficulty: difficulty / 100,
        complexity: complexity / 100,
        time: time / 60,
        importance: importance / 100
    };

    console.log(question);

    removeElementsByClass("error", "success");
    checkForErrorInAddQuestion(question, text, complexity, time, difficulty, importance, btn);
}

function generateUpdatedQuestion() {
    var text = document.getElementById('questionText').innerHTML;
    var difficulty = document.getElementById('difficultyOutput').value;
    var complexity = document.getElementById('complexityOutput').value;
    var time = document.getElementById('timeOutput').value;
    var importance = document.getElementById('importanceOutput').value;

    var question = {
        text: text,
        difficulty: difficulty / 100,
        complexity: complexity / 100,
        time: time / 60,
        importance: importance / 100
    };

    removeElementsByClass("error", "success");
    saveQuestion(question);
}

//Finds the active question for deletion inside the evaluation
function findActiveQuestionForDeletion() {
    var questionId = questions[questionIndex]["question_id"];
    deleteQuestion(questionId);
}

//Shows the selected question based on questionIndex
function showQuestion(questions, questionIndex) {
    removeElement("sliderWrapper");
    generateSliderContent(questions, questionIndex);
}

//Updates the display of total pages inside the pageSelector
function updateTotalPagesDisplay() {
    document.getElementById('totalPages').innerHTML = questions.length;
}

//Chooses the previous questionIndex
function previousQuestion() {
    var pageInput = document.getElementById("pageInput");

    if (questionIndex < 1) {
        console.log("The lowest questionIndex has been reached");
    }

    else {
        questionIndex = questionIndex - 1;
        pageInput.innerHTML = parseInt(pageInput.innerHTML) - 1;
        console.log("QuestionIndex is: " + questionIndex);

        showQuestion(questions, questionIndex);
        updateQuestionCardInfo();
    }
}

//Chooses the next questionIndex
function nextQuestion() {
    var pageInput = document.getElementById("pageInput");

    if (questionIndex > (questions.length - 2)) {
        console.log("The highest questionIndex has been reached");
    }

    else {
        questionIndex = questionIndex + 1;
        pageInput.innerHTML = parseInt(pageInput.innerHTML) + 1;
        console.log("QuestionIndex is: " + questionIndex);

        showQuestion(questions, questionIndex);
        updateQuestionCardInfo();
    }
}

//Displays the question and the text inside the card at the bottom of the evaluation
function updateQuestionCardInfo() {
    var questionDisplay = document.getElementById("questionDisplayCard");
    questionDisplay.innerHTML = "Question " + (questionIndex + 1);

    var questionText = document.getElementById("questionTextCard");
    questionText.innerHTML = questions[questionIndex]["text"];
}

//Imports the value used in the slider
function importValue(input) {
    var slider = document.getElementById(input.id.slice(0, - 5) + "Slider");
    var output = document.getElementById(input.id.slice(0, - 5) + "Output");
    slider.value = input.value;
    output.value = input.value;
}

//Updates the value in the output field
function displaySliderValue(slider) {
    var output = document.getElementById(slider.id.slice(0, - 6) + "Output");
    output.value = slider.value;
}

//Compares the value in the output field to not exceed max/min values
function updateSlider(output) {
    var slider = document.getElementById(output.id.slice(0, - 6) + "Slider");

    if (output.value > output.max) {
        output.value = output.max;
        slider.value = output.max;
    }

    else if (output.value < output.min) {
        output.value = output.min;
        slider.value = output.min;
    }

    else {
        slider.value = output.value;
    }
}

var datetime = null,
    date = null;

var update = function () {
    date = moment(new Date());
    datetime.html(date.format('dddd / MMMM Do YYYY'));
};

$(document).ready(function(){
    datetime = $('#timeView')
    update();
    setInterval(update, 1000);
});