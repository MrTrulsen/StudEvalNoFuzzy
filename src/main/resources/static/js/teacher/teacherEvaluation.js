
// Generates a question based on user input
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

    checkForErrorInAddQuestion(question, text, complexity, time, difficulty, importance, btn);
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