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
