
var email;

//Prints out an error message to the user
function showErrorMessage(placement, errorMessage) {
  var errorPlacement = document.getElementById(placement);
  var errorDiv = document.createElement("div");

  errorDiv.className = "error";
  errorDiv.innerHTML = errorMessage;
  errorPlacement.append(errorDiv)
}

//Prints out a success message to the user
function showSuccessMessage(placement, errorMessage) {
    var errorPlacement = document.getElementById(placement);
    var errorDiv = document.createElement("div");

    errorDiv.className = "success";
    errorDiv.innerHTML = errorMessage;
    errorPlacement.append(errorDiv)
}

//Removes value inside input fields
function removeInputValue(input) {
    var element = document.getElementById(input);
    if (element.length > 0) {
        element.setAttribute("value", "");
    }
}

//Removes element by id
function removeElement(id) {
    var element = document.getElementById(id);
    return element.parentNode.removeChild(element);
}

//Removes elements by class name
function removeElementsByClass(className, className2) {
    var elements = document.getElementsByClassName(className);
    var elements2 = document.getElementsByClassName(className2);

    if (className !== null) {
      while (elements.length > 0) {
          elements[0].parentNode.removeChild(elements[0]);
      }
  }

  else {
      while (elements2.length > 0) {
          elements2[0].parentNode.removeChild(elements2[0]);
      }
  }
}

//Checks for empty field
function checkForEmptyField(inputField, placement, btn) {
    if (inputField.length === 0) {
        showErrorMessage(placement, "The field can not be empty");
        btn.removeAttribute("data-dismiss", "modal");
    }
}

//Checks if field exceeds a specified number
function checkIfLimitIsExceeded(inputField, placement, value, btn) {
    if (inputField > value) {
        showErrorMessage(placement, "This value can not exceed a total of " + value);
        btn.removeAttribute("data-dismiss", "modal");
    }
}

//TODO: Remove if not being used later in the project
function getCount(parent, getChildrensChildren){
    var relevantChildren = 0;
    var children = parent.childNodes.length;
    for(var i=0; i < children; i++){
        if(parent.childNodes[i].nodeType != 3){
            if(getChildrensChildren)
                relevantChildren += getCount(parent.childNodes[i],true);
            relevantChildren++;
        }
    }
    return relevantChildren;
}

function getLoginEmail() {
    console.log(email);
    return email;
}

function setLoginEmail() {
    email = document.getElementById("username").value;
    console.log(email);
}