








//Adds a new evaluation by making a card with user input at the dashboard
function addEvaluation() {
  var courseId = document.getElementById("courseIdInput").value;
  var courseName = document.getElementById("courseNameInput").value;
  var course = courseId + " - " + courseName;

  var date = document.getElementById("dateInput").value;
  var month = document.getElementById("monthInput").value;
  var year = document.getElementById("yearInput").value;

  var closed;
  var opened;
  dateFormat(date, month, year);
  addEvaluationCard(courseId, course, opened, closed);

  function dateFormat(date, month, year) {
    var headerDate = month.concat(" ").concat(Number(parseInt(date) + 1)).concat(" ").concat(year);
    var footerDate = month.concat(" ").concat(date.concat(" ")).concat(year);
    var format = "MMM Do YYYY";

    closed = moment(headerDate, format).format(format);
    opened = moment(footerDate, format).format(format);
  }
}

//Draws a evaluation card at the dashboard based on the fields
function addEvaluationCard(courseId, course, opened, closed) {
  var card = document.createElement("div");
  card.id = "evaluationCard" + courseId;
  card.className = "card text-center";

  var cardHeader = document.createElement("div");
  cardHeader.className = "card-header";
  cardHeader.innerHTML = "Open until: " + closed;
  card.append(cardHeader);

  var cardBody = document.createElement("div");
  cardBody.className = "card-body";
  card.append(cardBody);

  var h5 = document.createElement("h5");
  h5.className = "card-title";
  h5.innerHTML = course;
  cardBody.append(h5);

  var p = document.createElement("p");
  p.className = "card-text";
  p.innerHTML = "With supporting text below as a natural lead-in to additional content.";
  cardBody.append(p);

  var button = document.createElement("button");
  button.id = "seeEvalButton" + courseId;
  button.className = "btn btn-primary evalButton";
  button.setAttribute("onclick", "location.href='#'");
  button.type = "submit";
  button.innerText = "See evaluation";
  cardBody.append(button);

  var button = document.createElement("button");
  button.id = "resultButton" + courseId;
  button.className = "btn btn-primary evalButton";
  button.setAttribute("data-toggle", "modal");
  button.setAttribute("data-target", "#modalResult");
  button.type = "submit";
  button.innerText = "Result";
  cardBody.append(button);

  var button = document.createElement("button");
  button.id = "removeButton" + courseId;
  button.className = "btn btn-primary evalButton";
  button.setAttribute("data-toggle", "modal");
  button.setAttribute("data-target", "#modalRemove");
  button.type = "submit";
  button.innerText = "Remove";
  cardBody.append(button);

  var cardFooter = document.createElement("div");
  cardFooter.className = "card-footer text-muted";
  cardFooter.innerHTML = "Opened: " + opened;
  card.append(cardFooter);

  document.getElementById("cardArea").appendChild(card);
}

//Removes a evaluation when user press on the remove button inside the card
function removeEvaluation() {
  var courseId = document.getElementById("removeCourse").value;
  var removeCourse = document.getElementById("removeCourse");
  removeCourse.classList.remove("is-invalid");

  if (courseId.length == 0) {
    removeCourse.classList.add("is-invalid");
  }
  
  else {
    var remove = document.getElementById("evaluationCard" + courseId);
    var removeCourseButton = document.getElementById("removeCourseButton");
    remove.parentNode.removeChild(remove);
    removeCourseButton.setAttribute("data-dismiss", "modal");
  }
}

//Toggles the data inside the graph drawing
function toggleDataSeries(e) {
	if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	} else {
		e.dataSeries.visible = true;
	}
	e.chart.render();
}

window.onload = function ()  {

var chart = new CanvasJS.Chart("chartContainer", {
	exportEnabled: true,
	animationEnabled: true,
  zoomEnabled: true,
	title:{
		text: "Question scores before and after evaluation"
	},
	axisX: {
		title: "Questions"
	},
	axisY: {
		title: "Question scores in %"
	},
	toolTip: {
		shared: true
	},
	legend: {
		cursor: "pointer",
		itemclick: toggleDataSeries
	},
	data: [{
		type: "column",
		name: "Before",
		showInLegend: true,
		yValueFormatString: "#,##0.#",
		dataPoints: [
			{ label: "1", y: 10 },
			{ label: "2", y: 4 },
			{ label: "3", y: 5 },
			{ label: "4", y: 7 },
			{ label: "5", y: 9 },
      { label: "6", y: 3 },
			{ label: "7", y: 10 },
			{ label: "8", y: 7 },
			{ label: "9", y: 4 },
			{ label: "10", y: 5 },
      { label: "11", y: 6 },
			{ label: "12", y: 9 },
			{ label: "13", y: 8 },
			{ label: "14", y: 7 },
			{ label: "15", y: 4 }
		]
	},
	{
		type: "column",
		name: "After",
		axisYType: "secondary",
		showInLegend: true,
		yValueFormatString: "#,##0.#",
		dataPoints: [
			{ label: "1", y: 12 },
			{ label: "2", y: 8 },
			{ label: "3", y: 7 },
			{ label: "4", y: 9 },
			{ label: "5", y: 7 },
      { label: "6", y: 5 },
			{ label: "7", y: 8 },
			{ label: "8", y: 4 },
			{ label: "9", y: 6 },
			{ label: "10", y: 3 },
      { label: "11", y: 9 },
			{ label: "12", y: 7 },
			{ label: "13", y: 5 },
			{ label: "14", y: 4 },
			{ label: "15", y: 6 }
		]
	}]
});
chart.render();
}

//Closes the active element
function closeSelf(){
    self.close();
    return true;
}
