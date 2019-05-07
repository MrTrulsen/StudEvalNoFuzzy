
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
                return response.text();
            }
        });
}

//Deletes a question from the database
function deleteUser(userId) {
    //TODO: Get userId
    console.log("Deleting user: ", userId);
    fetch("/deleteUser/" + userId, {
        method: "DELETE"
    })
        .then(function (response) {
            var btn = document.getElementById("confirmDeleteQuestionBtn");
            console.log("Response: ", response);

            if (response.status === 200) {
                btn.setAttribute("data-dismiss", "modal");
                window.location.reload();
            }

            else {
                btn.removeAttribute("data-dismiss");
                showErrorMessage("modalDeleteQuestionBody", "Error when trying to delete question. Please try again.");
                return response.text();
            }
        });
}

//Loads questions from the database
function getCurrentUser() {
    console.log("Getting current user...");
    fetch("/getCurrentUser/").then(function(response) {
            return response.text();
        })
            .then(function (user) {
                console.log("Current user: ", user);
                return user;
            })
}

//Loads evaluations from the database
function getCourseName(courseId) {
    console.log("Getting courseName...");
    fetch("/getNameOfCourse/" + courseId).then(function (response) {
        return response.text();
    })
        .then(function(courseName){
            console.log(courseName);
            return courseName;
        });
}