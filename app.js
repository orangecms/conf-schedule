angular.module('myApp.service', ['cb.x2js']).
  factory('DataSource', function ($http, x2js) {
    return {
      get: function (callback) {
        $http.get("debconf15.xml", // no CORS on https://summit.debconf.org/debconf15.xml :/
          {
            transformResponse: function (data) { return x2js.xml_str2json( data ); }
          }
        )
        .success(function(data, status) { callback(data); });
      }
    };
  })
;

var app = angular.module('myApp', ['myApp.service']);

var AppController = function($scope, DataSource) {
  setData = function(data) {
    $scope.schedule = data.schedule;
  };

  DataSource.get(setData);

  $scope.roomHasEvents = function (room) {
    return room.hasOwnProperty("event") && room.event.length;
  };

  $scope.toggleVisible = function (event) {
    event.visible = ! (event.hasOwnProperty("visible") && event.visible);
  };

  $scope.isVisible = function (event) {
    return event.hasOwnProperty("visible") && event.visible;
  };

  $scope.getNames = function (persons) {
    if (persons instanceof Array) {
      var names = [];
      angular.forEach(persons, function (name) { names.push(name.__text); });
      return names;
    } else if (persons) {
      return [ persons.__text ];
    } else {
      return [];
    }
  };
};

app.controller("AppController", AppController);
