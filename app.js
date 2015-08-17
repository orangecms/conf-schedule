/**
 * Wrapper for the XML data source that converts to JSON
 */
angular
  .module('myApp.service', ['cb.x2js'])
  .factory('DataSource', function ($http, x2js) {
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

// the actual app
angular
  .module('myApp', ['myApp.service'])
  .controller("AppController", function($scope, $interval, DataSource) {
    /**
     * callback fetching and setting the data
     *
     * @param  {object} data  The schedule data in JSON format
     */
    setData = function(data) {
      $scope.schedule = data.schedule;
    };
    // first fetch from the XML data source
    DataSource.get(setData);

    /**
     * refresh data every 5 minutes
     */
    $scope.refresh = function () {
      DataSource.get(setData);
    };
    $interval($scope.refresh, 5 * 60 * 1000);

    /**
     * helper to filter out rooms without any event entries
     *
     * @param  {object}  room  The room from the data source
     * @return {Boolean}       True if there are entries for the given room
     */
    $scope.roomHasEvents = function (room) {
      return room.hasOwnProperty("event");
    };

    /**
     * state variable for showing / hiding event descriptions and speakers
     *
     * @param  {object}  event  The event from the data source
     * @return {Boolean}        True if the description should be shown
     */
    $scope.isVisible = function (event) {
      return event.hasOwnProperty("visible") && event.visible;
    };

    /**
     * toggle helper for showing / hiding event descriptions and speakers
     *
     * @param  {object}  event  The event from the data source
     */
    $scope.toggleVisible = function (event) {
      event.visible = ! $scope.isVisible(event);
    };

    /**
     * access helper for the list of speakers
     *
     * @param  {object} persons  List of persons as from the converted XML
     * @return {object}          Array of names
     */
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

    /**
     * access helper for the list of events
     *
     * @param  {object} event  The event as from the converted XML
     * @return {object}        Array of events
     */
    $scope.getEvents = function (event) {
      if (event instanceof Array) {
        return event;
      } else if (event) {
        return [ event ];
      } else {
        return [];
      }
    };

  })
;
