



var value = 1;







function enterQuestion() {



    var txt;

    var newValue= value++;
    var question = prompt("Please enter Question "+ newValue +" : ", "");
    if (question == null || question == "") {
        txt = "User didnt put in a Question.";
    } else {
        txt = "Question " + newValue + " : " + question;


    }
    document.getElementById("a1").innerHTML = txt;

}


function newQuestionButton(){
 var newButton = document.createElement("button");
 newButton.innerHTML=newValue;
 document.body.appendChild(newButton);

}
