
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
function saveQuestion() {
    console.log("Saving question...");
    fetch("/editQuestion", {
        method: "POST"
    })
        .then(function (response) {
            console.log("Response: ", response);

            if (response.status === 200) {
                showSuccessMessage()("buttonArea", "Question successfully saved");
            }

            else {
                showErrorMessage("buttonArea", "Error when trying to save question. Please try again.");
                return response;
            }
        });
}