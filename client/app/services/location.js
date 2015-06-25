angular.module('edify.location', [])

.factory('Location', function ($http, $location, $window, $q) {
  
  var calculateZipDistance = function (zipA, zipB, callback) {
    var coordsA = byZipCode(zipA);
    var coordsB = byZipCode(zipB);

    coordsA.then(function(dataA){
      coordsB.then(function(dataB) {
        var result = calculateDistance(
          {lat: dataA.lat(), lng: dataA.lng()}, 
          {lat: dataB.lat(), lng: dataB.lng()});
        
        callback(result);
      });
    });
  }

  /**
  * Gets the latitude and longitude for a zipcode
  * @param zipCode
  * @returns {Function} promise
  */
  var byZipCode = function(zipCode){
    var geocoder = new google.maps.Geocoder();
    var coords = $q.defer();
    geocoder.geocode({address: zipCode.toString()}, function(results, status) {

      if ( results.length > 1 ){ coords.resolve(0); }

      if ( !! results[0].geometry.location ){
        coords.resolve(results[0].geometry.location);
      }
      else {
        coords.resolve(0);
      }
    });

    return coords.promise;
  }

  var deg2rad = function(deg) {
    return deg * Math.PI/180; // radians = degrees * pi/180
  };

  var round = function(number){
    return Math.round( number * 1000) / 1000;
  }

  var calculateDistance = function (pointA, pointB) {

    var radius = 3961;

    var lat1, lon1, lat2, lon2, dlat, dlon, a, c, dm, dk, mi, km;

    // convert coordinates to radians
    lat1 = deg2rad(pointA.lat * 1);
    lon1 = deg2rad(pointA.lng * 1);
    lat2 = deg2rad(pointB.lat * 1);
    lon2 = deg2rad(pointB.lng * 1);

    // find the differences between the coordinates
    dlat = lat2 - lat1;
    dlon = lon2 - lon1;
    /*  console.log(dlon, dlat); */ 
    // here's the heavy lifting
    a  = Math.pow(Math.sin(dlat/2),2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon/2),2);
    c  = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a)); // great circle distance in radians
    dm = c * radius; // great circle distance in miles
    /*console.log(dm); */
    return round(dm);
  };


  return {
    calculateDistance: calculateDistance,
    byZipCode: byZipCode,
    calculateZipDistance: calculateZipDistance
  }

});