'use strict';

/* Controllers */

var myControllers = angular.module('signalReviewApp.controllers', ['signalReviewApp.factories']);

myControllers.controller('HomeCtrl', function ($scope, $routeParams, $location, reviewSubmitFactory) {
       $scope.model = {
            searchString: $routeParams.searchString,
            searchResults: ""


        };

        //review widget
        $scope.IsEmptyStar = function (searchResult, starNumber) {
            if (searchResult.theReview < starNumber) {
                return true;
            } else {
                return false;
            }

        };
        $scope.IsNewStar = function (searchResult, starNumber) {
            starNumber = parseInt(starNumber);
            if (searchResult.theReview >= starNumber) {
                return true;
            } else {
                return false;
            }
        };

        $scope.setRating = function (searchResult, number) {
            searchResult.theReview = parseInt(number);
        };

        // make sure search value = searchstring if searchstring is set
        if ($scope.model.searchString) {
            $scope.searchValue = $scope.model.searchString;

        }

        //deal with collapse code
        $scope.sidebars = {};
        $scope.hideSidebars = function () {
            angular.forEach($scope.sidebars, function (value, key){
                //$scope.sidebars.key = false;

               $scope.sidebars[key] = false;
            })
        };
        $scope.showSearchResults = function () {
            $scope.hideSidebars();
            $scope.sidebars.searchResultsShown = true;

        };
        $scope.hideSearchResults = function () {
            $scope.sidebars.searchResultsShown = false;
            $location.path("/", false);
            $scope.searchValue = "";
            $scope.searchResults = "";
        };
        //show search results
        $scope.searchResultsShown = false;

        //animationController
        $scope.leftMenuShowing = false;
        $scope.theLocation = $location;

        //url faking
        $scope.changeUrl = function (url){
            $location.path(url, false);
        }
        if($location.path() == "/signin")
        {
            $scope.sidebars.showSignin = true;
        }
        $scope.submitReview = function () {
            console.log("fired");


        };
    $scope.submitReview = function () {
        reviewSubmitFactory.postSubmitReviewAsync(function(results) {
            console.log('fruitsController async returned value');
            $scope.fruits = results.fruits;
        });
    };



    })



