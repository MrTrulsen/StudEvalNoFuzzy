
// Generates buttons at the bottom of the question card
function generateQuestionCardButtons() {
    var buttonBar = document.createElement("nav");
    buttonBar.id = "buttonBar";
    buttonBar.className = "navbar navbar-light container";

    var savePlacement = document.createElement("div");
    savePlacement.id = "savePlacement";
    savePlacement.className = "navbar-nav ml-auto";
    buttonBar.append(savePlacement);

    var saveQuestion = document.createElement("div");
    saveQuestion.id = "saveQuestion";
    saveQuestion.className = "nav-item";
    savePlacement.append(saveQuestion);

    var saveBtn = document.createElement("button");
    saveBtn.id = "saveBtn";
    saveBtn.className = "btn btn-primary";
    saveBtn.innerHTML = "Save";
    saveBtn.setAttribute("onclick", "getUpdatedValues()");
    saveQuestion.append(saveBtn);

    var deleteQuestion = document.createElement("div");
    deleteQuestion.id = "deleteQuestion";
    deleteQuestion.className = "nav-item navbar-nav mr-auto";
    buttonBar.append(deleteQuestion);

    var deleteQuestionBtn = document.createElement("button");
    deleteQuestionBtn.id = "deleteQuestionBtn";
    deleteQuestionBtn.className = "btn btn-primary";
    deleteQuestionBtn.innerHTML = "Delete";
    deleteQuestionBtn.setAttribute("type", "submit");
    deleteQuestionBtn.setAttribute("data-toggle", "modal");
    deleteQuestionBtn.setAttribute("data-target", "#modalDeleteQuestion");
    deleteQuestion.append(deleteQuestionBtn);

    document.getElementById("buttonArea").append(buttonBar);
}