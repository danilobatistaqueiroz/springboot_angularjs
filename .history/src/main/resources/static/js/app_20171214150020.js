var app = angular.module('ngapp',['ngRoute','ngResource']);

app.config(['$routeProvider','$locationProvider', '$resourceProvider', 
function($routeProvider, $locationProvider, $resource) {
    $routeProvider
    .when('/', {
        templateUrl: 'greeting.html',
        controller: 'GreetingController'
    })
    .when('/about', {
        templateUrl: 'about.html',
        controller: 'AboutController'
    })
    .when('/login', {
        templateUrl: 'login.html',
        controller: 'LoginController'
    })
    .otherwise({
        redirectTo: 'about'
    });
}]);

app.factory("Users", function($resource) {
    return $resource("/api/users/:id");
});

//angular.module('app').factory('listUsers', function(){
 //   var listU = {};
 //   listU.list = [];
//    listU.add = function(usr){
//        listU.list.push({id: listU.list.length, text: usr});
//    };
 //   return listU;
//});
app.service('listUsers', function() {
    var lst = [];
    this.add = function (User) {
        lst.push({id: lst.length, name: User.name});
    }
    this.get = function() {
        return lst;
    }
    this.reset = function() {
        lst = [];
    }
});

app.controller('AboutController', function($scope, Users, listUsers) {
    Users.get({ id: 2 }, function(data) {
        $scope.logado = data;
        $scope.listUsers = listUsers;
      });
});
app.controller('LoginController', function($scope, Users, listUsers) {
    var self = this;
    $scope.signIn = function() {
        var user = Users.get({id:123}, function() {
            listUsers.add(user);
            $scope.logado = user;
        });
    }
    $scope.logoff = function() {
        listUsers.reset();
    }
});
app.controller('GreetingController', function($scope, Users) {
    $scope.logado = {"id":"1", "name":"Danilo"};
});
app.controller('MenuController', function($scope, listUsers){
    $scope.$watch(function () { return listUsers.get(); },
    function (value) {
        $scope.users = value;
    }
    );
});