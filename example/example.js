(function() {
    document.addEventListener('DOMContentLoaded', function () {
        console.log("Promise Resolve");
        console.log("here");
        var example = new GridMaker("wrapper", "block", 4);
        console.log(example);
        example.start();   
    }, false);
})();