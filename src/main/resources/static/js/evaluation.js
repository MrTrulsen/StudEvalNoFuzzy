





var questions = [];

questionValue();

function questionValue() {
  var complexity = 0.25;
  var time_use = 0.25;
  var difficulty = 0.25;
  var importance = 0.25;

  var q1 = [complexity, time_use, difficulty, importance];
  var test = questions.push(q1);

  var q2 = [complexity, time_use, difficulty, importance];
  var test2 = questions.push(q2);
}
console.log(questions);


var value = 1;
var newValue = 1;
console.log(newValue);

function enterQuestion(newValue) {



    var txt;
    newValue = value++;
    console.log(newValue);
    var question = prompt("Please enter Question "+ newValue +" : ", "");
    if (question == null || question == "") {
        txt = "User didnt put in a Question.";
    } else {
        txt = "Question " + newValue + " : " + question;


    }
    document.getElementById("a1").innerHTML = txt;
    return newValue;
}


function newQuestionButton(value){

  console.log(value);
  var newButton = document.createElement("button");
  newButton.innerHTML= value;
  document.body.appendChild(newButton);

}
