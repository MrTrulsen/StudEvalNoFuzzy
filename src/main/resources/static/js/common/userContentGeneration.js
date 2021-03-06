
// Generates a evaluation card at the dashboard based on the user input
function generateEvaluationCard(evalId, start, end, course, btnText, disabled) {
    var card = document.createElement("div");
    card.id = evalId;
    card.className = "card text-center";

    generateCardContent("div", "card-header", "Open until: ", end);

    var cardBody = document.createElement("div");
    cardBody.className = "card-body";
    card.append(cardBody);

    generateCardContent2("h5", "card-title", course);
    if (isStudent === true) {
        generateBtn(btnText, disabled,"onclick", "var btn = this; setEvalId(btn); location.href='/studentpage/evaluation'");
    }

    else {
        generateBtn("See evaluation", false, "onclick", "var btn = this; setEvalId(btn); location.href='/teacherpage/evaluation'");
        generateBtn( "Result", false, "onclick", "var btn = this; setEvalId(btn); gatherQuestions()", "data-toggle", "modal", "data-target", "#modalResult");
        generateBtn("Remove", false, "onclick", "var btn = this; setEvalId(btn)", "data-toggle", "modal", "data-target", "#modalRemove");
    }

    generateCardContent("div", "card-footer text-muted", "Open: ", start);

    document.getElementById("cardArea").append(card);

    // Generates buttons inside the evaluation card
    function generateBtn(btnText, disabled, attribute, data, attribute2, data2, attribute3, data3) {
        var btn = document.createElement("button");
        btn.className = "btn btn-primary evalBtn";
        btn.disabled = disabled;
        btn.setAttribute(attribute, data);
        btn.setAttribute(attribute2, data2);
        btn.setAttribute(attribute3, data3);
        btn.type = "submit";
        btn.innerText = btnText;
        cardBody.append(btn);
    }

    // Generates content inside the evaluation card with date
    function generateCardContent(element, className, innerHtml, date) {
        var content = document.createElement(element);
        content.className = className;
        content.innerHTML = innerHtml + date;
        card.append(content);
    }

    // Generates content inside the evaluation card
    function generateCardContent2(element, className, innerHtml) {
        var content = document.createElement(element);
        content.className = className;
        content.innerHTML = innerHtml;
        cardBody.append(content);
    }
}

// Function to generate sliders and the content inside the evaluation document
function generateSliderContent(questions, questionIndex) {

    console.log(questions[questionIndex]);
    var questionDisplay = document.getElementById("questionDisplay");
    questionDisplay.innerHTML = "Question " + (questionIndex + 1);

    var questionText = document.getElementById("questionText");
    questionText.innerHTML = questions[questionIndex]["text"];

    var wrapper = document.createElement("div");
    wrapper.className = "container";
    wrapper.id = "sliderWrapper";

    var difficulty = questions[questionIndex]["difficulty"] * 100;
    var complexity = questions[questionIndex]["complexity"] * 100;
    var time = questions[questionIndex]["time"] * 60;
    var importance = questions[questionIndex]["importance"] * 100;

    generateSliders("difficulty", "Difficulty", Math.round(difficulty));
    generateSliders("complexity", "Complexity", Math.round(complexity));
    generateSliders("time", "Time", Math.round(time));
    generateSliders("importance", "Importance", Math.round(importance));

    document.getElementById("questionArea").append(wrapper);

    // Function to generate sliders with input
    function generateSliders(type, headerText, input) {
        var valueToString = input.toString();
        var minToString = (1).toString();
        var maxToString = (100).toString();

        var content = document.createElement("div");
        content.id = type + "Content";
        content.className = "container sliders";

        var header = document.createElement("h2");
        header.innerHTML = headerText;
        content.append(header);

        var slider = document.createElement("input");
        slider.id = type + "Slider";
        slider.className = "slider";
        slider.setAttribute("type", "range");
        slider.setAttribute("min", 1);
        slider.setAttribute("max", 100);
        slider.setAttribute("value", input);
        slider.setAttribute("onchange", "var slider = this; displaySliderValue(slider);");
        content.append(slider);

        var ticks = document.createElement("div");
        ticks.id = type + "Ticks";
        ticks.className = "sliderticks";
        content.append(ticks);

        var tickLow = document.createElement("p");
        tickLow.innerHTML = 1;
        ticks.append(tickLow);

        var tickMid = document.createElement("p");
        tickMid.innerHTML = 50;
        ticks.append(tickMid);

        var tickHigh = document.createElement("p");
        tickHigh.innerHTML = 100;
        ticks.append(tickHigh);

        var value = document.createElement("p");
        value.innerHTML = "Value: ";
        content.append(value);

        var valueInput = document.createElement("input");
        valueInput.id = type + "Output";
        valueInput.className = "form-control valueOutput";
        valueInput.setAttribute("type", "number");
        valueInput.setAttribute("min", minToString);
        valueInput.setAttribute("max", maxToString);
        valueInput.setAttribute("value", valueToString);
        valueInput.setAttribute("onchange", "var output = this; updateSlider(output)");
        value.append(valueInput);

        wrapper.append(content);
    }
}

// Generates a seperate div with input fields for changing password
function generateChangePasswordFields() {
    if (document.getElementById("passwordInputPlacement") !== null) {
        removeElement("passwordInputPlacement");
    }

    var inputPlacement = document.createElement("div");
    inputPlacement.id = "passwordInputPlacement";
    document.getElementById("changePassword").append(inputPlacement);

    var infoText = document.createElement("p");
    infoText.innerHTML = "Please write in your old and your new suggested password. We recommend a strong password for your own security.";
    inputPlacement.append(infoText);

    generateInputField("oldPassword", "Old Password");
    generateInputField("newPassword", "New Password");

    //Generates input fields for password input
    function generateInputField(inputId, inputText) {
        var placeholder = document.createElement("div");
        placeholder.id = inputId;
        placeholder.className = "input-group";
        inputPlacement.append(placeholder);

        var prepend = document.createElement("div");
        prepend.className = "input-group-prepend";
        placeholder.append(prepend);

        var text = document.createElement("span");
        text.className = "input-group-text";
        text.innerHTML = inputText;
        prepend.append(text);

        var input = document.createElement("input");
        input.id = inputId + "Input";
        input.className = "form-control";
        input.type = "password";
        input.placeholder = "...";
        placeholder.append(input);
    }

    var buttonPlacement = document.createElement("div");
    buttonPlacement.id = "changePasswordButtons";
    inputPlacement.append(buttonPlacement);

    generateButton("closePasswordChange", "Close", "removeElement('passwordInputPlacement')");
    generateButton("savePasswordChange", "Save Settings", "getPasswords()");

    // Generates buttons with onclick functions
    function generateButton(id, text, onclickFunction) {
        var btn = document.createElement("button");
        btn.id = id;
        btn.className = "btn btn-primary";
        btn.type = "button";
        btn.innerHTML = text;
        btn.setAttribute("onclick", onclickFunction);
        buttonPlacement.append(btn);
    }
}

// Generates a seperate div with confirmation to delete current account
function generateRemoveUserField() {
    if (document.getElementById("deleteAccountPlacement") !== null) {
        removeElement("deleteAccountPlacement");
    }

    var inputPlacement = document.createElement("div");
    inputPlacement.id = "deleteAccountPlacement";
    document.getElementById("deleteAccount").append(inputPlacement);

    var infoText = document.createElement("p");
    infoText.innerHTML = "Are you sure that you want to delete your account?";
    inputPlacement.append(infoText);

    var buttonPlacement = document.createElement("div");
    buttonPlacement.id = "changePasswordButtons";
    inputPlacement.append(buttonPlacement);

    generateButton("closeDeleteUserField", "Close", "removeElement('deleteAccountPlacement')");
    generateButton("deleteUserBtn", "Delete account", "deleteUser(); location.href='/logout'");

    // Generates buttons with onclick functions
    function generateButton(id, text, onclickFunction) {
        var btn = document.createElement("button");
        btn.id = id;
        btn.className = "btn btn-primary";
        btn.type = "button";
        btn.innerHTML = text;
        btn.setAttribute("onclick", onclickFunction);
        buttonPlacement.append(btn);
    }
}

// Generates buttons at the bottom of the question card
function generateQuestionCardButtons() {
    var buttonBar = document.createElement("nav");
    buttonBar.id = "buttonBar";
    buttonBar.className = "navbar navbar-light container";

    var savePlacement = document.createElement("div");
    savePlacement.id = "savePlacement";
    savePlacement.className = "navbar-nav ml-auto";
    buttonBar.append(savePlacement);

    if (isStudent === true) {
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
    }

    else {
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
    }

    document.getElementById("buttonArea").append(buttonBar);
}

// Generates currentUser display to display the current user logged in
function generateCurrentUserDisplay(userId) {
    var header = document.getElementById("header");

    var text = document.createElement("p");
    text.innerHTML = "Logged in as " + userId;
    header.append(text);
}