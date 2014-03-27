'use strict';

/* Directives */
var myDirectives = angular.module('signalReviewApp.directives', []);

myDirectives.directive('map', function ($location) {
    return {
        restrict: 'E',
        replace: true,
        template: '<div></div>',
        link: function (scope, element, attrs) {
            var center = new google.maps.LatLng(50.1, 14.4);

            //setup style
            var thestyle = [
                {
                    "featureType": "administrative",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "stylers": [
                        {
                            "color": "#84afa3"
                        },
                        {
                            "lightness": 52
                        }
                    ]
                },
                {
                    "stylers": [
                        {
                            "saturation": -77
                        }
                    ]
                },
                {
                    "featureType": "road"
                }
            ]
            var nelatlong = new google.maps.LatLng(-51.869708,-142.558594);
            var swlatlong = new google.maps.LatLng(69.143009,131.660156);
            var startBounds = new google.maps.LatLngBounds(nelatlong,swlatlong);
            var map_options = {
                zoom: 14,
                center: center,
                styles: thestyle
            };


            // create map
            var map = new google.maps.Map(document.getElementById(attrs.id), map_options);
            map.fitBounds(startBounds);
            var markers = [];

            // Create the search box and link it to the UI element.
            var input = /** @type {HTMLInputElement} */ (
                document.getElementById('pac-input'));
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            var searchBox = new google.maps.places.SearchBox(
                /** @type {HTMLInputElement} */
                (input));
            // [START region_getplaces]
            // Listen for the event fired when the user selects an item from the
            // pick list. Retrieve the matching places for that item.

            //if user comes in using a url
            if (scope.model.searchString) {
                var service = new google.maps.places.PlacesService(map);
                var request = {
                    query: scope.model.searchString

                };

                service.textSearch(request, function (results, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        scope.model.searchResults = results;
                        console.log(scope.model.searchResults);
                        scope.showSearchResults();
                        scope.$apply();
                        placeMarkers(scope.model.searchResults);

                    }
                });


            }

            google.maps.event.addListener(searchBox, 'places_changed', function () {
                $location.path("/search/" + scope.searchValue, false);
                var places = searchBox.getPlaces();

                processResults(scope, searchBox, places);
            });

            function processResults(scope, searchBox, places) {

                scope.$apply(function () {
                    scope.showSearchResults();
                    scope.model.searchResults = places;
                    console.log(scope.model.searchResults);
                    placeMarkers(scope.model.searchResults);
                });

            }

            function placeMarkers(places) {
                for (var i = 0, marker; marker = markers[i]; i++) {
                    marker.setMap(null);
                }

                // For each place, get the icon, place name, and location.
                markers = [];
                var bounds = new google.maps.LatLngBounds();
                for (var i = 0, place; place = places[i]; i++) {
                    var image = {
                        url: place.icon,
                        size: new google.maps.Size(71, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(25, 25)
                    };

                    // Create a marker for each place.
                    var marker = new google.maps.Marker({
                        map: map,
                        icon: image,
                        title: place.name,
                        position: place.geometry.location
                    });

                    markers.push(marker);

                    bounds.extend(place.geometry.location);


                }
                map.fitBounds(bounds);
            }


        }
    }
});

myDirectives.directive('star', function () {

    return function (scope, element, attrs) {
        element.bind("mouseenter", function () {
            scope.$apply(scope.setRating(scope.searchResult, attrs.star));

        })
        element.addClass("emptyStar");

    }
});

