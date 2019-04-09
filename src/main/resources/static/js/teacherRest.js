
//Function to add evaluations in the database
function addEvaluation(object, courseName, btn) {
  console.log(btn);
  fetch("/addEvaluation/" + courseName.value, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(object)
  }).then(function (response, courseName, btn) {
        btn = document.getElementById("saveEvaluationBtn"); //Temporary fix
        console.log("Response: ", response);

        if (response.status === 200) {
            btn.setAttribute("data-dismiss", "modal");
            addEvaluationCard(object, courseName);

            removeInputValue(courseId);
            removeInputValue(courseName);
            removeInputValue(evalDates);
            removeInputValue(examTime);
        } else {
            btn.removeAttribute("data-dismiss", "modal");
            return response.text();
        }
    }).then(function () {
        showErrorMessage("modalAddEvalBody", "Error when trying to add evaluation. Please try again.");
    });
}
