
var questions = [];
var questionIndex;

window.addEventListener('load',function() {
    // Find this user and prints it in the header
    getCurrentUserToDisplay();

    // Gets the stored evalId and sets it as a global variable
    evalId = localStorage.getItem("evalId");

    // Gets the stored isStudent and sets it as a global variable
    isStudent = localStorage.getItem("isStudent");

    // Loads the available questions
    loadQuestions(true);
});

function getUpdatedValues() {
    if (isStudent === true) {
        var questionId =  questions[questionIndex]['question_id'];
    }

    else {
        var text = document.getElementById('questionText').innerHTML;
    }

    var difficulty = document.getElementById('difficultyOutput').value;
    var complexity = document.getElementById('complexityOutput').value;
    var time = document.getElementById('timeOutput').value;
    var importance = document.getElementById('importanceOutput').value;

    if (isStudent === true) {
        var answer = {
            question_id: questionId,
            difficulty: difficulty / 100,
            complexity: complexity / 100,
            time: time / 60,
            importance: importance / 100
        };

        if (answers.indexOf(answers[questionIndex]) === -1) {
            answers.push(answer);
        }

        else {
            console.log("Object already exists");
            answers[questionIndex] = answer;
        }
    }

    else {
        var question = {
            text: text,
            difficulty: difficulty / 100,
            complexity: complexity / 100,
            time: time / 60,
            importance: importance / 100
        };

        saveQuestion(question);
    }
}

// Updates the display of total pages inside the pageSelector
function updateTotalPagesDisplay() {
    document.getElementById('totalPages').innerHTML = questions.length;
}

// Shows the selected question based on questionIndex
function showQuestion(questionIndex) {
    removeElement("sliderWrapper");

    if (isStudent === true) {
        if (answers.indexOf(answers[questionIndex]) !== -1) {
            console.log(answers);
            generateSliderContent(answers, questionIndex);
        }

        else {
            console.log(questions);
            generateSliderContent(questions, questionIndex);
        }
    }

    else {
        generateSliderContent(questions, questionIndex);
    }
}

// Chooses the previous questionIndex
function previousQuestion() {
    var pageInput = document.getElementById("pageInput");

    if (questionIndex < 1) {
        console.log("The lowest questionIndex has been reached");
    }

    else {
        if (isStudent === true) {
            getUpdatedValues();
        }

        questionIndex = questionIndex - 1;
        pageInput.innerHTML = parseInt(pageInput.innerHTML) - 1;
        console.log("QuestionIndex is: " + questionIndex);

        showQuestion(questionIndex);
        updateQuestionCardInfo();
    }
}

// Chooses the next questionIndex
function nextQuestion() {
    var pageInput = document.getElementById("pageInput");

    if (questionIndex > (questions.length - 2)) {
        console.log("The highest questionIndex has been reached");
    }

    else {
        if (isStudent === true) {
            console.log("ja");
            getUpdatedValues();
        }

        questionIndex = questionIndex + 1;
        pageInput.innerHTML = parseInt(pageInput.innerHTML) + 1;
        console.log("QuestionIndex is: " + questionIndex);

        showQuestion(questionIndex);
        updateQuestionCardInfo();
    }
}

// Displays the question and the text inside the card at the bottom of the evaluation
function updateQuestionCardInfo() {
    var questionDisplay = document.getElementById("questionDisplayCard");
    questionDisplay.innerHTML = "Question " + (questionIndex + 1);

    var questionText = document.getElementById("questionTextCard");
    questionText.innerHTML = questions[questionIndex]["text"];
}

// Updates the value in the output field
function displaySliderValue(slider) {
    var output = document.getElementById(slider.id.slice(0, - 6) + "Output");
    output.value = slider.value;
}

// Compares the value in the output field to not exceed max/min values
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

// Initializes a timer at the bottom card to display current time
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