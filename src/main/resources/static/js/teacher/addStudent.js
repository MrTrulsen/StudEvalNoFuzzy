
//Adds students to the database
function addStudent(users) {
    console.log("Adding student...");
    fetch("/addStudents/1" ,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(users)
    })
        .then(function (response) {
        console.log("Response: ", response);

        if (response.status === 200) {
            console.log(users);
            showSuccessMessage("modalAddStudentBody", "User successfully added");
            setTimeout(function(){
                removeElementsByClass("error", "success");
                $('#modalAddStudent').modal('toggle');
            }, 500);
        }

        else if(response.status === 400){
            showErrorMessage("modalAddStudentBody", "Student already exists or wrong type of mail. Must end with @stud.ntnu.no");
            setTimeout(function(){
                removeElementsByClass("error", "success")
            }, 2000);
        }

        else {
            showErrorMessage("modalAddStudentBody", "Error when trying to add student. Please try again.");
            setTimeout(function(){
                removeElementsByClass("error", "success")
            }, 1000);
            return response.text();
        }
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
}
