var app = angular.module('MyApp',['ngRoute','ngResource']);

app.config(['$routeProvider','$locationProvider', '$resourceProvider', 
function($routeProvider, $locationProvider, $resource) {
    $routeProvider
    .when('/', {
        templateUrl: 'templates/greeting.html',
        controller: 'GreetingController'
    })
    .when('/about', {
        templateUrl: 'templates/about.html',
        controller: 'AboutController'
    })
    .when('/login', {
        templateUrl: 'templates/login.html',
        controller: 'LoginController'
    })
    .otherwise({
        redirectTo: 'login'
    });

    angular.module('app.services').factory('Entry', function($resource) {
        return $resource('/user/:userId'); // Note the full endpoint address
      });

    app.controller('AboutController', function($scope) {

    });
    app.controller('LoginController', function($scope, Entry) {
        $scope.signIn = function() {
            var User = Entry.get({userId:$scope.id});
            var user = User.get({userId:123}, function() {
              $scope.logado = user;
            });
        }
    });
    app.controller('GreetingController', function($scope) {
        $scope.logado = new User(0, '');
    });

}]);