function addEvaluation() {
  var card = document.createElement("div");
  card.id = "evaluationCard";
  card.className = "card text-center";

  var cardHeader = document.createElement("div");
  cardHeader.className = "card-header";
  cardHeader.innerHTML = "Featured";
  card.append(cardHeader);

  var cardBody = document.createElement("div");
  cardBody.className = "card-body";
  card.append(cardBody);

  var h5 = document.createElement("h5");
  h5.className = "card-title";
  cardBody.append(h5);

  var h5Text = document.createTextNode("Special title treatment");
  h5.append(h5Text);

  var p = document.createElement("p");
  p.className = "card-text";
  cardBody.append(p);

  var pText = document.createTextNode("With supporting text below as a natural lead-in to additional content.");
  p.append(pText);

  var button = document.createElement("button");
  button.id = "cardButton"
  button.className = "btn btn-primary";
  button.setAttribute("onclick", "location.href='#'");
  button.type = "submit";
  button.innerText = "See evaluation";
  cardBody.append(button);

  var button = document.createElement("button");
  button.id = "cardButton"
  button.className = "btn btn-primary";
  button.setAttribute("data-toggle", "modal");
  button.setAttribute("data-target", "#modalResult");
  button.type = "submit";
  button.innerText = "Result";
  cardBody.append(button);

  var button = document.createElement("button");
  button.id = "cardButton"
  button.className = "btn btn-primary";
  button.setAttribute("onclick", "removeEvaluation()");
  button.type = "submit";
  button.innerText = "Remove";
  cardBody.append(button);

  var cardFooter = document.createElement("div");
  cardFooter.className = "card-footer text-muted";
  cardFooter.innerHTML = "2 days ago (TIMESTAMP DATE)";
  card.append(cardFooter);

  document.getElementById("cardArea").appendChild(card);
}

function removeEvaluation() {
  var remove = document.getElementById("evaluationCard");
  remove.parentNode.removeChild(remove);
}

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


function closeSelf(){
    self.close();
    return true;
}
