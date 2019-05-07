
//Function to generate sliders and the content inside the evaluation document
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

    generateSliders("difficulty", "Difficulty", difficulty);
    generateSliders("complexity", "Complexity", complexity);
    generateSliders("time", "Time", Math.round(time));
    generateSliders("importance", "Importance", importance);

    document.getElementById("questionArea").append(wrapper);

    //Function to generate sliders with input
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

//Generates a seperate div with input fields for changing password
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

    //Generates buttons with onclick functions
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

//Generates a seperate div with confirmation to delete current account
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
    generateButton("deleteUserBtn", "Delete account", "deleteUser(userId)");

    //Generates buttons with onclick functions
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

function generateCurrentUserDisplay(userId) {
    var header = document.getElementById("header");

    var text = document.createElement("p");
    text.innerHTML = "Logged in as: " + userId;
    header.append(text);
}