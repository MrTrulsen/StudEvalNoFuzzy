



var value = 1;

function enterQuestion() {

    var newValue=value++;

    var txt;


    var question = prompt("Please enter Question "+ newValue+" : ", "");
    if (question == null || question == "") {
        txt = "User didnt put in a Question.";
    } else {
        txt = "Question " + newValue + " : " + question;


    }
    document.getElementById("a1").innerHTML = txt;

}





