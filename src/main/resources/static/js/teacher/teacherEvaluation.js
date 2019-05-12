
var isStudent = false;

// Generates a question based on user input
function generateQuestion() {
    var text = document.getElementById('textInput');
    var difficulty = document.getElementById('difficultyInput');
    var complexity = document.getElementById('complexityInput');
    var time = document.getElementById('timeInput');
    var importance = document.getElementById('importanceInput');

    var question = {
        text: text.value,
        difficulty: difficulty.value / 100,
        complexity: complexity.value/ 100,
        time: time.value / 60,
        importance: importance.value / 100
    };

    console.log(question);

    checkForErrorInAddQuestion(question, text, complexity, time, difficulty, importance);
}

// Finds the active question for deletion inside the evaluation
function findsActiveQuestionForDeletion() {
    var questionId = questions[questionIndex]["question_id"];
    deleteQuestion(questionId);
}

// Gets mail from input fields and sets standard password = null
function generateStudents(){
    // This function takes in students in an array, but at this time it only takes in
    // one student at the time in that array. The backend is ready to take in several students
    // using this function, but needs to be implemented in this function

    var students = [];
    var email = document.getElementById("studentEmailInput").value;
    var password = null;

    var student = {
        email: email,
        password: password
    };

    students.push(student);
    addStudents(students, evalId);
}