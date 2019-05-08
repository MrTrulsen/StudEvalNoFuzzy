
var evalId;

window.addEventListener('load',function() {
    // Find this user and prints it in the header
    getCurrentUserToDisplay();

    // Stores the variable isStudent
    setIsStudent();

    // Loads the available evaluations
    loadEvaluations(isStudent);
});

// Adds an evaluation card at the dashboard based on the user input or when loaded into the dashboard
function addEvaluationCard(evaluation, courseName, btnText, disabled) {
    var course = evaluation["courseId"] + " - " + courseName; //TODO: Get course name from the database
    start = moment(evaluation["startDate"]).format('dddd / MMMM Do YYYY');
    end = moment(evaluation["stopDate"]).format('dddd / MMMM Do YYYY');

    generateEvaluationCard(evaluation["evalId"], start, end, course, btnText, disabled);
}

// Sets a evalId variable as a global variable to be used between documents
function setEvalId(btn) {
    var parentId = btn.parentElement.parentElement.id;
    console.log("Evalutaion ID: ", parentId);
    evalId = parentId;
    localStorage.setItem("evalId", evalId);
}

// Sets a isStudent variable as a global variable to be used between documents
function setIsStudent() {
    localStorage.setItem("isStudent", isStudent);
}