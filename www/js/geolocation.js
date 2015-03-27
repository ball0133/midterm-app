document.addEventListener("DOMContentLoaded", function geo() {
    
    if( navigator.geolocation ){ 
        //code goes here to find position
        var params = {enableHighAccuracy: false, timeout:360000, maximumAge:6000000};
        //enableHighAccuracy means try to use GPS and drain the battery
        //for improved accuracy within a few meters.
        //maximum age is how long to cache the location info
        //timeout is how long to wait for the network to respond after the user says ok
        navigator.geolocation.getCurrentPosition( reportPosition, gpsError, params ); 
    
        //to continually check the position (in case it changes) use
        // navigator.geolocation.watchPosition( reportPosition, gpsError, params)
    }else{
        //browser does not support geolocation api
        alert("Sorry, but your browser does not support location based awesomeness.")
    }

});

document.addEventListener("deviceready", function geo(){
    
    if( navigator.geolocation ){ 
        //code goes here to find position
        var params = {enableHighAccuracy: false, timeout:360000, maximumAge:6000000};
        //enableHighAccuracy means try to use GPS and drain the battery
        //for improved accuracy within a few meters.
        //maximum age is how long to cache the location info
        //timeout is how long to wait for the network to respond after the user says ok
        navigator.geolocation.getCurrentPosition( reportPosition, gpsError, params ); 
    
        //to continually check the position (in case it changes) use
        // navigator.geolocation.watchPosition( reportPosition, gpsError, params)
    }else{
        //browser does not support geolocation api
        alert("Sorry, but your browser does not support location based awesomeness.")
    }
    
});


 
 
function watchPosition(position) {

    var currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    var mapOptions = {
        center: new google.maps.LatLng(lat, lon),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);

    var marker = new google.maps.Marker({
        position: currentLocation,
        map: map,
        draggable: true,
		animation: google.maps.Animation.BOUNCE



    });
//        pages[1].appendChild(map);
}


function gpsError(error) {
    var errors = {
        1: 'Permission denied',
        2: 'Position unavailable',
        3: 'Request timeout'
    };
    alert("Error: " + errors[error.code]);
}