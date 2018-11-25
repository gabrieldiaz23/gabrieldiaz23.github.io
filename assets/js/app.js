
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBqJDXn5Cer5rAtUtevmc6Re4N3Wqnpln0",
    authDomain: "trainscheduledb-80e84.firebaseapp.com",
    databaseURL: "https://trainscheduledb-80e84.firebaseio.com",
    projectId: "trainscheduledb-80e84",
    storageBucket: "trainscheduledb-80e84.appspot.com",
    messagingSenderId: "781856277409"
};
firebase.initializeApp(config);

var database = firebase.database();
//var btn = $(".btn");

$("#btn1").on("click", function() {
    event.preventDefault();
    
    var train = $("#trainInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var trainTime = moment($("#firstTrainTime").val().trim(), "HH:mm A").format("LT"); 
    //var trainTime = $("#firstTrainTime").val().trim();
    var trainFrequency = $("#trainFreq").val().trim();

    var newTrain = 
    {
        tName: train,
        dest: destination,
        tTime: trainTime,
        tFreq: trainFrequency
    };
    
    database.ref().push(newTrain);

    $("#trainInput").val("");
    $("#destinationInput").val("");
    $("#firstTrainTime").val("");
    $("#trainFreq").val("");

    /*var curr = moment();
    var curryear = moment().subtract(1, "years");
    console.log(curryear);*/

});

database.ref().on("child_added", function(snapshot) {
    
    var train = snapshot.val().tName;
    var destination = snapshot.val().dest;
    var trainTime = snapshot.val().tTime;
    var trainFrequency = snapshot.val().tFreq;

    var currTime = moment().format();
    

    var freq = parseInt(trainFrequency);
    var firstTrain = moment(trainTime,"HH:mm A").format("LT");
    var mFirstTrain = moment().diff(moment(trainTime), 'minutes');
    var tRemaining = mFirstTrain % trainFrequency;
    var minAway = freq - tRemaining;
    var nextArrival = moment().add(minAway, "m").format("hh:mm A");

    if ((currTime - firstTrain) > 0)
    {
        nextArrival = moment().add(minAway, 'minutes').format('hh:mm A');
        minAway = trainFrequency - tRemaining;
    }
    else 
    {
        nextArrival = snapshot.val().tTime;
        minAway = trainFrequency - tRemaining;
    }


    var addTRow = 
    $("<tr>").append(
        $("<td>").text(train),
        $("<td>").text(destination),
        $("<td>").text(trainFrequency + " minutes"),
        $("<td>").text(nextArrival),
        $("<td>").text(minAway)
    );

    $("#mainTBody").append(addTRow);
});
