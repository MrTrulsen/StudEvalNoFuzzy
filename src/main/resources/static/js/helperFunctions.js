//Prints out an error message to the user
function showErrorMessage(placement, errorMessage) {
  var errorPlacement = document.getElementById(placement);
  var errorDiv = document.createElement("div");

  errorDiv.className = "error";
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
function removeElementsByClass(className) {
  var elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
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
