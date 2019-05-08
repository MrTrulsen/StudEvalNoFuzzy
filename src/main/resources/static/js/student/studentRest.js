
// Adds answers to the evaluation in the database
function submitAnswers(answers) {
    console.log("Adding answers to the backend...");
    fetch("/addAnswers/" + evalId, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(answers)
    })
        .then(function (response) {
            var btn = document.getElementById("submitQuestionBtn");
            console.log("Response: ", response);

            if (response.status === 200) {
                btn.setAttribute("onclick", "submitAnswers(questions); location.href='/studentpage'");
            }

            else {
                btn.removeAttribute("onclick");
                return response.text();
            }
        });
}