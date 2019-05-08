// Generates buttons at the bottom of the question card
function generateQuestionCardButtons() {
    var buttonBar = document.createElement("nav");
    buttonBar.id = "buttonBar";
    buttonBar.className = "navbar navbar-light container";

    var savePlacement = document.createElement("div");
    savePlacement.id = "savePlacement";
    savePlacement.className = "navbar-nav ml-auto";
    buttonBar.append(savePlacement);

    var submitQuestion = document.createElement("div");
    submitQuestion.id = "submitQuestion";
    submitQuestion.className = "nav-item navbar-nav mr-auto";
    buttonBar.append(submitQuestion);

    var submitQuestionBtn = document.createElement("button");
    submitQuestionBtn.id = "submitQuestionBtn";
    submitQuestionBtn.className = "btn btn-primary";
    submitQuestionBtn.innerHTML = "Submit";
    submitQuestionBtn.setAttribute("type", "submit");
    submitQuestionBtn.setAttribute("onclick", "submitAnswers(answers); location.href='/studentpage'");
    submitQuestion.append(submitQuestionBtn);

    document.getElementById("buttonArea").append(buttonBar);
}