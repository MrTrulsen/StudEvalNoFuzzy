
var questionDataPoints = [];
var answerDataPoints = [];
var chart;


window.addEventListener('load', function() {

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
            if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
            } else {
                e.dataSeries.visible = true;
            }
            chart.render();
        }
    }, 1000);
});

function gatherQuestions() {
    loadAnswersGraph();
    loadQuestionsGraph();

    questionDataPoints = [];
    answerDataPoints = [];

    setInterval(function(){ chart.render(); }, 100);
    setTimeout(function(){
        calculateQuestions(questions, questionDataPoints);
        calculateQuestions(answers, answerDataPoints);
    }, 1000);
}

function calculateQuestions(type, array) {
    for (var i = 0; i < type.length; i++) {
        var calculatedData = Math.ceil(((type[i]["complexity"] + type[i]["time"] +
            type[i]["difficulty"] + type[i]["importance"]) / 4) * 100);
        array.push({x: i + 1, y: calculatedData});
    }
    console.log(array);
    chart.render();
}

function checkIfEmpty(array) {
    if(array.length > 0) {
        array = [];
        console.log(array.length);
        this.array = array;
    }
    else {
        console.log("hei");

    }
}