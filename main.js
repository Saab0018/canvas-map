document.addEventListener("DOMContentLoaded", function () {
  
  var h1 = document.createElement("h1");
  document.querySelector("body").appendChild(h1);
  h1.innerHTML = "Your Current Position";
  getLocation();

});


function getLocation() {
  
        
// check to see if browser supports geolocation
  if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(reportPosition, gpsError);
// alert if it does not support geolocation
    } else {
    alert("This browser does not support Geolocation.");
  }
}

function reportPosition(position) {
 
  //create canvas 400*400
  var canvas = document.createElement("canvas");
  document.querySelector("body").appendChild(canvas);
  canvas.id = "myCanvas";
  var canvas = document.querySelector("#myCanvas"); 
  var context = canvas.getContext("2d");
  canvas.height = 400;
  canvas.width = 400;
  //create variables to simplify code
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  var key = "AIzaSyC_9VJLocckPT0EM1b8IJi3Rz-MGxPX39s";
  //create and load map into canvas
  var mapImage = document.createElement("img");
  mapImage.src ="https://maps.googleapis.com/maps/api/staticmap?center=" +
                latitude + "," + longitude +
                "&zoom=14&size=400x400&maptype=roadmap&markers=color:red%7Clabel:A%7C" +
                latitude + "," + longitude +
                "&key=" + key;
  
  mapImage.addEventListener("load",function() {
        context.drawImage(mapImage, 0, 0);
        
    });
  
  
  //create a div that displays location info
  var div = document.createElement("div");
  document.querySelector("body").appendChild(div);
  div.innerHTML += "Latitude: " + position.coords.latitude + "&deg;<br/>" + "Longitude: " + position.coords.longitude + "&deg;<br/>" + "Accuracy: " + position.coords.accuracy + "m<br/>" + "Altitude: " + position.coords.altitude + " m<br/>" + "Heading: " + position.coords.heading + " &deg;<br/>" + "Speed: " + position.coords.speed + " m/s<br/>" + "Timestamp: " + position.timestamp;
  console.dir(position);


};

function gpsError(error) {
  var errors = {
    1: 'Permission denied',
    2: 'Position unavailable',
    3: 'Request timeout'
  };
  //alert error type
  alert("Error: " + errors[error.code]);
};