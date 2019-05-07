
//Adds evaluations in the database
function changePassword(oldPassword, newPassword) {
    console.log("Changing password...");
    fetch("/changePassword/" + oldPassword + "/" + newPassword, {
        method: "POST"
    })
        .then(function (response) {
            console.log("Response: ", response);

            if (response.status === 200) {
                removeElement("passwordInputPlacement");
            }

            else {
                showErrorMessage("changePassword", "Error when trying to change password. Please try again.");
                setTimeout(function(){
                    removeElementsByClass("error", "success")
                }, 2000);
                return response.text();
            }
        });
}

//Deletes a question from the database
function deleteUser() {
    //TODO: Get userId
    console.log("Deleting user: ");
    fetch("/deleteUser/" , {method: "DELETE"})
        .then(function (response) {
            console.log("Response: ", response);

            if (response.status === 200) {
                window.location.reload();
            }

            else {
                showErrorMessage("modalDeleteQuestionBody", "Error when trying to delete question. Please try again.");
                setTimeout(function(){
                    removeElementsByClass("error", "success")
                }, 2000);
                return response.text();
            }
        });
}

var currentUser = "";
//Loads questions from the database
async function getCurrentUser() {
    console.log("Getting current user...");
    await fetch("/getCurrentUser/").then(async function(response) {
           const name = await response.text();
           console.log("Current user: ", name);
           currentUser = name;
           return name;
            });
}

var returnString = "";
//Loads evaluations from the database
async function getCourseName(courseId) {
    console.log("Getting courseName...");
     await fetch("/getNameOfCourse/" + courseId).then(async function (response) {
        const json = await response.text();
        console.log(json);
        returnString = json;
        return json;
    });
}