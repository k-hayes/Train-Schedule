/* global firebase moment */
// Steps to complete:


// Initialize Firebase
var config = {
  apiKey: "AIzaSyDypQn315UoDuTRsdvT_yJEGUu5sN_gCVA",
  authDomain: "train-timetable-ff59b.firebaseapp.com",
  databaseURL: "https://train-timetable-ff59b.firebaseio.com",
  projectId: "train-timetable-ff59b",
  storageBucket: "train-timetable-ff59b.appspot.com",
  messagingSenderId: "940302069761"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding train
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainRole = $("#destination-input").val().trim();
  var trainStart = moment($("#firstTrain-Input").val().trim(), "HH:mm").subtract(10, "years").format("X");
  var trainFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    role: trainDestination,
    start: trainStart,
    frequency: trainFrequency
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.start);
  console.log(newTrain.frequency);

  // Alert
  alert("Train successfully added to timetable");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#firstTrain-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().role;
  var trainStart = childSnapshot.val().start;
  var trainFrequency = childSnapshot.val().frequency;

  // train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainStart);
  console.log(trainFrequency);

  // Prettify the train start
  var trainStartPretty = moment.unix(trainStart).format("HH/mm");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var differenceTimes = moment().diff(moment.unix(trainStart), "minutes");
  var trainRemainder = moment().diff(moment.unix(trainStart), "minutes") % trainFrequency ;
  var trainMinutes = trainFrequency - trainRemainder;

  var trainArrival = moment().add(trainMinutes, "m").format("hh:mm A");

  console.log(moment().format("hh:mm A"));
  console.log(trainArrival);
  console.log(moment().format("X"));


  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + trainArrival + "</td><td>" + trainMinutes + "</td></tr>");

});
// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use mets this test case
