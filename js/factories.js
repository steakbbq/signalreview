var myFactories = angular.module('signalReviewApp.factories', [])

myFactories.factory('reviewSubmitFactory', function($http) {
    return {
        postSubmitReviewAsync: function(callback) {
            $http.post('../lib/2mellow/api/review.place.php').success(callback);
        }
    };
});

