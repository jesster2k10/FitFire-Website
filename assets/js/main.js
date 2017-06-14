// JavaScript Document
 "use strict";

var latitude = null;
var longitude = null;

$(updateBoxDimension);
$(window).on('resize', updateBoxDimension);

function updateBoxDimension() {
    var $box = $('.slideshow-container');

    // To center the box
    var boxLeft = ($('.hero-map').width()) / 2 - ($box.width() / 2),
        boxTop = 350;

    $box.css({
        left: boxLeft,
        top: boxTop
    });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude; 
	
	console.log(latitude);
	console.log(longitude);
	
	map.flyTo({
        center: [
            longitude,
            latitude]
    });
}

function getCircuits() {
	
	// Create a Firebase reference where GeoFire will store its information
	var circuitsLocationRef = firebase.database().ref("circuits_locations");
	// Create a GeoFire index
	var geoFire = new GeoFire(circuitsLocationRef);
	
	var center = [-74.0070, 40.7437];
	
	// check for user location
	if (latitude != null && longitude != null) {
		center = [longitude, latitude];
	}
	
	var geoQuery = geoFire.query({
		center: center,
  		radius: 50
	});
	
	var onReadyRegistration = geoQuery.on("ready", function() {
  		console.log("GeoQuery has loaded and fired all other events for initial data");
	});

	var onKeyEnteredRegistration = geoQuery.on("key_entered", function(key, location, distance) {
  		console.log(key + " entered query at " + location + " (" + distance + " km from center)");
	});

	var onKeyExitedRegistration = geoQuery.on("key_exited", function(key, location, distance) {
  		console.log(key + " exited query to " + location + " (" + distance + " km from center)");
	});

	var onKeyMovedRegistration = geoQuery.on("key_moved", function(key, location, distance) {
  		console.log(key + " moved within query to " + location + " (" + distance + " km from center)");
	});
}

function notify(evt){alert(evt.target.id)}


// call code once page is loaded
$(document).ready(function(){
	
	getLocation();
	//getCircuits();
	
  // hide all elements
    $('#get-fit-fast').css('opacity', 0);
	$('#get-fit-fast-title').css('opacity', 0);
	$('#get-fit-fast-body').css('opacity', 0);
	$('#phones').css('opacity', 0);
 
    $('#get-fit-fast').waypoint(function() {
        $('#get-fit-fast').addClass('fadeInUp animated');
    }, { offset: '60%' });
	
	$('#get-fit-fast-title').waypoint(function() {
        $('#get-fit-fast-title').addClass('fadeInUp animated');
    }, { offset: '55%' });
	
	$('#get-fit-fast-body').waypoint(function() {
        $('#get-fit-fast-body').addClass('fadeInUp animated');
    }, { offset: '55%' });
	
	$('#phones').waypoint(function() {
        $('#phones').addClass('fadeIn animated');
    }, { offset: '65%' });
	
	$('.block').matchHeight({
    	byRow: false,
    	property: 'height',
    	target: null,
    	remove: false
}	);
	
	$('#js-message-bars').cookieBar();
	
	$('#scroll_one').click(function(e) {  
      alert(1);
    });
	
});