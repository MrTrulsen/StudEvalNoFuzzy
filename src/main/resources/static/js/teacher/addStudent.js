


//Adds students to the database
function addStudent(users) {
    console.log("Adding student...");
    fetch("/addStudents/1" ,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(users)
    }).then(function (response) {
       var btn = document.getElementById("addStudentsBtn"); //Temporary fix
        console.log("Response: ", response);
        if (response.status === 200) {
            btn.setAttribute("data-dismiss", "modal");
            //generateStudent(user);
            console.log(users);
        } else {
            btn.removeAttribute("data-dismiss");
            return response.text();
        }
            }).then(function () {
        //showErrorMessage("modalAddEvalBody", "Error when trying to add student. Please try again.");

    });
}
function generateStudent(){

    var email = document.getElementById("studentEmailInput").value;
    var password= null;

    var student = {
        email: email,
        password: password
    };

    var array = [student];

    console.log(array);
    console.log(student);
    addStudent(array);

//checkForExistingStudent(text,email,password,btn);


    function checkForExistingStudent(text, email, password, btn) {

        if (user != null) {

            console.log(student + "already exists!");

            btn.removeAttribute("data-dismiss", "modal");
        }
        else {
            btn.setAttribute("data-dismiss", "modal");
            addStudent(users);
        }
    }
}
