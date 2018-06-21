<script src="https://www.gstatic.com/firebasejs/5.0.4/firebase.js"></script>

var config = {
  apiKey: "AIzaSyCGmaQqrm17EaMruxxCK6Rs1rfhzz344Vk",
  authDomain: "train-scheduler-2d39f.firebaseapp.com",
  databaseURL: "https://train-scheduler-2d39f.firebaseio.com",
  projectId: "train-scheduler-2d39f",
  storageBucket: "train-scheduler-2d39f.appspot.com",
  messagingSenderId: "2769953834"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainStart = moment($("#start-input").val().trim(), "HH:mm").format("X");
    var trainRate = $("#rate-input").val().trim();
  
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      start: trainStart,
      rate: trainRate
    };
  
    database.ref().push(newTrain);
  
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.rate);
  
    alert("Train Successfully Added");
  
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
  });
  
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  
    console.log(childSnapshot.val());
  
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainStart = childSnapshot.val().start;
    var trainRate = childSnapshot.val().rate;
  
    console.log(trainName);
    console.log(trainDestination);
    console.log(trainStart);
    console.log(trainRate);

    var trainStartPretty = moment.unix(trainStart).format("HH:mm");
  
    var trainArrival = moment().diff(moment(trainStart, "X"), "minutes");
    console.log(trainArrival);

    var minAway = trainArrival * trainRate;
    console.log(empBilled);
  
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
    trainStartPretty + "</td><td>" + trainMonths + "</td><td>" + trainRate + "</td></tr>");
  });

  