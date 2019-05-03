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
    slider.setAttribute("min", input - 10);
    slider.setAttribute("max", input + 10);
    slider.setAttribute("value", input);
    slider.setAttribute("onchange", "var slider = this; displaySliderValue(slider);");
    content.append(slider);

    var ticks = document.createElement("div");
    ticks.id = type + "Ticks";
    ticks.className = "sliderticks";
    content.append(ticks);

    var tickLow = document.createElement("p");
    tickLow.innerHTML = input - 10;
    ticks.append(tickLow);

    var tickMid = document.createElement("p");
    tickMid.innerHTML = input;
    ticks.append(tickMid);

    var tickHigh = document.createElement("p");
    tickHigh.innerHTML = input + 10;
    ticks.append(tickHigh);

    var value = document.createElement("p");
    value.innerHTML = "Value: ";
    content.append(value);

    var valueInput = document.createElement("input");
    valueInput.id = type + "Output";
    valueInput.className = "form-control valueOutput";
    valueInput.setAttribute("type", "text");
    valueInput.setAttribute("value", valueToString);
    valueInput.setAttribute("onchange", "var output = this; updateSlider(output)");
    value.append(valueInput);

    wrapper.append(content);
  }
}