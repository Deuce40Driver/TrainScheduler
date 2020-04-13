// Firebase configuration
var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "train-scheduler-2d39f.firebaseapp.com",
  databaseURL: "https://train-scheduler-2d39f.firebaseio.com",
  projectId: "train-scheduler-2d39f",
  storageBucket: "train-scheduler-2d39f.appspot.com",
  messagingSenderId: "2769953834",
  appId: "1:2769953834:web:547cf473a6f0eb00148f53"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// Add New Train Button
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Assign user inputs
  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("HH:mm");
  var trainRate = $("#rate-input").val().trim();

  // Create new newTrain object
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    start: trainStart,
    rate: trainRate
  };

  // Push new train to Firebase
  database.ref().push(newTrain);
  console.log("New Train Added...")
  console.log(newTrain);

  // Clear Modal input and hide dropdown
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
  $('.dropdown-toggle').dropdown('hide');
  $('#exampleModal').modal('show');
});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainStart = childSnapshot.val().start
  var trainRate = parseInt(childSnapshot.val().rate);
  var startTime = moment(trainStart, 'HH:mm');
  var minAway = 0;
  var nextArrival = 0;
  var currentTime = moment();

  if (moment().isBefore(startTime)) {
    minAway = (startTime.diff(currentTime, 'minutes'));
    nextArrival = moment(startTime).format("h:mm a");
    console.log("First train is " + minAway + " minutes from now at " + nextArrival)
  };

  if (moment().isAfter(startTime)) {
    minAway = trainRate - ((currentTime.diff(startTime, 'minutes')) % trainRate);
    nextArrival = moment().add(minAway, 'minutes').format('h:mm a');
    console.log("The next train arrives in " + minAway + " minutes at " + nextArrival);
  };

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainRate + "</td><td>" + nextArrival + "</td><td>" + minAway + "</td></tr>");
});