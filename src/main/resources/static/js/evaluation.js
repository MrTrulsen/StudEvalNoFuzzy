


var questions = [];

var questionNumber = 1;

function questionValue(question) {
  var complexity = 0.25;
  var time_use = document.getElementById('myTime').value;
  var difficulty = 0.25;
  var importance = 0.25;


  var q1 = [question, complexity, time_use, difficulty, importance];
  var newQuestion = questions.push(q1);
console.log(time_use);
console.log(questions);


}


function addQuestion() {
  console.log(questions);

}



function showQuestion(index){
document.getElementById("a1").innerHTML = questions[index][0];
}


function enterQuestion() {
    var txt;

    var question = prompt("Please enter Question "+ questionNumber +" : ", "");
    if (question == null || question == "") {

        txt = " User didnt put in a Question.";


    } else {

        txt = question;
        newQuestionButton();
        questionValue(question);
        questionNumber++;


    }
    document.getElementById("a1").innerHTML = txt;

}


function newQuestionButton(){

  console.log(questionNumber);
  var newButton = document.createElement("button");
  newButton.innerHTML= questionNumber;
var questionIndex = questionNumber-1;
  newButton.addEventListener('click', function() {
    showQuestion(questionIndex);
  }, false);

  document.body.appendChild(newButton);

}
