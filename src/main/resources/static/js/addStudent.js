function generateStudent(){
    var email = document.getElementById("studentEmailInput").value;
    var password= null;

    var student = {
        email: email,
        password: password
    };

console.log(student);
}

//Adds students to the database
function addStudent(users) {
    console.log("Adding student...");
    fetch("/addStudent/" ,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(users)
    }).then(function (response, btn) {
        btn = document.getElementById("addStudentsBtn"); //Temporary fix
        console.log("Response: ", response);
        if (response.status === 200) {
            btn.setAttribute("data-dismiss", "modal");

        } else {
            btn.removeAttribute("data-dismiss", "modal");
            return response.text();
        }
            }).then(function () {
        showErrorMessage("modalAddEvalBody", "Error when trying to add student. Please try again.");
    });
}
