
//Generates a evaluation card at the dashboard based on the user input
function generateEvaluationCard(courseId, start, end, course) {
    var card = document.createElement("div");
    card.id = "evaluationCard" + courseId;
    card.className = "card text-center";

    generateCardContent("div", "card-header", "Open until: ", end);

    var cardBody = document.createElement("div");
    cardBody.className = "card-body";
    card.append(cardBody);

    generateCardContent2("h5", "card-title", course);
    generateCardContent2("p", "card-text", "With supporting text below as a natural lead-in to additional content.");
    generateBtn("takeEval", courseId, 1, "onclick", "location.href='/teacherpage/evaluation'", null, null, null, null, "Take evaluation");
    generateCardContent("div", "card-footer text-muted", "Opened: ", start);

    document.getElementById("cardArea").append(card);

    //Generates buttons inside the evaluation card
    function generateBtn(type, courseId, numOfAttributes, attribute, data, attribute2, data2, attribute3, data3, text) {
        var btn = document.createElement("button");
        btn.id = type + "btn" + courseId;
        btn.className = "btn btn-primary studentEvalBtn";
        btn.setAttribute(attribute, data);
        btn.type = "submit";
        btn.innerText = text;
        cardBody.append(btn);
    }

    //Generates content inside the evaluation card with date
    function generateCardContent(element, className, innerHtml, date) {
        var content = document.createElement(element);
        content.className = className;
        content.innerHTML = innerHtml + date;
        card.append(content);
    }

    //Generates content inside the evaluation card
    function generateCardContent2(element, className, innerHtml) {
        var content = document.createElement(element);
        content.className = className;
        content.innerHTML = innerHtml;
        cardBody.append(content);
    }
}

//Generates buttons at the bottom of the question card
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
    saveBtn.setAttribute("onclick", "updateQuestion()");
    saveQuestion.append(saveBtn);

    var submitQuestion = document.createElement("div");
    submitQuestion.id = "submitQuestion";
    submitQuestion.className = "nav-item navbar-nav mr-auto";
    buttonBar.append(submitQuestion);

    var submitQuestionBtn = document.createElement("button");
    submitQuestionBtn.id = "deleteQuestionBtn";
    submitQuestionBtn.className = "btn btn-primary";
    submitQuestionBtn.innerHTML = "Submit";
    submitQuestionBtn.setAttribute("type", "submit");
    submitQuestionBtn.setAttribute("onclick", "updateQuestion()");
    saveQuestion.append(submitQuestionBtn);

    document.getElementById("buttonArea").append(buttonBar);
}