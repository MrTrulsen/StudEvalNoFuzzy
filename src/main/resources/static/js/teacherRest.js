
//Function to add evaluations in the database
function addEvaluation(object, courseName, btn) {
  fetch("/addEvaluation/" + courseName.value, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(object)
  }).then(function (response, courseName, btn) {
        console.log("Response: ", response);

        var objectToArray = Object.values(object);
        console.log(objectToArray);

        if (response.status === 200) {
            btn.setAttribute("data-dismiss", "modal");
            addEvaluationCard(objectToArray[0], courseName.value, objectToArray[1], objectToArray[2]);

            removeInputValue(courseId);
            removeInputValue(courseName);
            removeInputValue(evalDates);
            removeInputValue(examTime);
        } else {
            return response.text();
        }
    }).then(function () {
        showErrorMessage("modalAddEvalBody", "Error when trying to add evaluation. Please try again.");
    });
}
