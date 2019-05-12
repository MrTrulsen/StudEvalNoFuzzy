
var isStudent = true;
var answers = [];

window.addEventListener('load',function() {
    // Gets the updated values every 5 seconds
    setInterval(function(){
        getUpdatedValues();
    }, 10000);
});