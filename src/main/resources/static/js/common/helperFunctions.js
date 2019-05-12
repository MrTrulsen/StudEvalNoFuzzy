
// Prints out an error message to the user
function showErrorMessage(placement, errorMessage) {
    var errorPlacement = document.getElementById(placement);
    var errorDiv = document.createElement("div");

    errorDiv.className = "error";
    errorDiv.innerHTML = errorMessage;
    errorPlacement.append(errorDiv);

    removeElementsByClassName("error", 2000);
}

// Prints out a success message to the user
function showSuccessMessage(placement, successMessage) {
    var successPlacement = document.getElementById(placement);
    var successDiv = document.createElement("div");

    successDiv.className = "success";
    successDiv.innerHTML = successMessage;
    successPlacement.append(successDiv);

    removeElementsByClassName("success", 500);
}

// Removes elements by className after a given delay
function removeElementsByClassName(className, delay) {
    setTimeout(function(){
        var elements = document.getElementsByClassName(className);
        while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
        }
    }, delay);
}

// Removes element by id
function removeElement(id) {
    var element = document.getElementById(id);
    return element.parentNode.removeChild(element);
}

// Updates the value in the slider
function updateInputField(field) {
    if (parseInt(field.value) > parseInt(field.max)) {
        console.log(field.max);
        field.value = field.max;
    }

    else if (parseInt(field.value) <  parseInt(field.min)) {
        console.log(field.min);
        field.value = field.min;
    }

    else {
        //Do nothing
    }
}

// Gets the currentUser from the backend
async function getCurrentUserToDisplay() {
    const user = await getCurrentUser();
    generateCurrentUserDisplay(currentUser);
}