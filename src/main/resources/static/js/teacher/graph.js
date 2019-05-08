
var questionDataPoints = [];
var answerDataPoints = [];
var chart;

window.addEventListener('load', function() {
// Initializes a line chart inside the result modal
    setTimeout(function () {
        chart = new CanvasJS.Chart("chartContainer", {
            exportEnabled: true,
            animationEnabled: true,
            zoomEnabled: true,
            theme: "light2",
            axisX: {
                title: "Question number",
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true
                }
            },
            axisY: {
                title: "Question scores in %",
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true
                }
            },
            toolTip: {
                shared: true
            },
            legend: {
                cursor: "pointer",
                verticalAlign: "bottom",
                horizontalAlign: "left",
                dockInsidePlotArea: true,
                itemclick: toggleDataSeries
            },
            data: [{
                type: "line",
                showInLegend: true,
                name: "Before",
                markerType: "square",
                color: "#4488DD",
                dataPoints: questionDataPoints
            },
                {
                    type: "line",
                    showInLegend: true,
                    name: "After",
                    lineDashType: "dash",
                    color: "#DC3545",
                    dataPoints: answerDataPoints
                }]
        });
        chart.render();

        function toggleDataSeries(e) {
            e.dataSeries.visible = !(typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible);
            chart.render();
        }
    }, 1000);
});

//Gathers all questions and answers
function gatherQuestions() {
    loadAnswers();
    loadQuestions();

    questionDataPoints = [];
    answerDataPoints = [];

    setInterval(function(){ chart.render(); }, 100);
    setTimeout(function(){
        calculateQuestions(questions, questionDataPoints);
        calculateQuestions(answers, answerDataPoints);
    }, 1000);
}

// Calculates the values inside the objects in the array
function calculateQuestions(type, array) {
    for (var i = 0; i < type.length; i++) {
        var calculatedData = Math.round(((type[i]["complexity"] + type[i]["time"] +
            type[i]["difficulty"] + type[i]["importance"]) / 4) * 100);
        array.push({x: i + 1, y: calculatedData});
    }
    console.log(array);
    chart.render();
}