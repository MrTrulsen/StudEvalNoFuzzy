
var questionDataPoints = [];
var answerDataPoints = [];
var chart;

window.addEventListener('load', function() {

    chart = new CanvasJS.Chart("chartContainer", {
        exportEnabled: true,
        animationEnabled: true,
        zoomEnabled: true,
        theme: "light2",
        axisX:{
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
        toolTip:{
            shared:true
        },
        legend:{
            cursor:"pointer",
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
            color: "#F08080",
            dataPoints: questionDataPoints
        },
            {
                type: "line",
                showInLegend: true,
                name: "After",
                lineDashType: "dash",
                dataPoints: answerDataPoints
            }]
    });
    chart.render();

    function toggleDataSeries(e){
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else{
            e.dataSeries.visible = true;
        }
        chart.render();
    }
});

function gatherQuestions() {
    loadAnswersGraph();
    loadQuestionsGraph();
    calculateQuestions(questions, questionDataPoints);
    calculateQuestions(answers, answerDataPoints);
}

function calculateQuestions(type, array) {
    if (array.length !== 0) {
        console.log(array.length);
        array = [];
    }
    for (var i = 0; i < type.length; i++) {
        var calculatedData = Math.ceil(((type[i]["complexity"] + type[i]["time"] +
            type[i]["difficulty"] + type[i]["importance"]) / 4) * 100);

        console.log(calculatedData);
        array.push({x: i + 1, y: calculatedData});
    }
    console.log(array);
}

setInterval(function(){ chart.render(); }, 100);