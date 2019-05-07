
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

//Saves the current question to the database
function saveQuestion(question) {
    console.log("Saving question...");
    fetch("/editQuestion", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(question)
    })
        .then(function (response) {
            console.log("Response: ", response);

            if (response.status === 200) {

                //showSuccessMessage()("controlPanelBody", "Question successfully saved");
                console.log(question);
            }

            else {
                showErrorMessage("controlPanelBody", "Error when trying to save question. Please try again.");
                return response;
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