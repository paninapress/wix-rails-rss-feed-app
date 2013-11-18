angular.module('rss.controllers', []);

var WidgetCtrl = ['$scope', '$window', 'SettingsService', 'FeedService',
    function ($scope, $window, SettingsService, FeedService) {
        $scope.init = function () {
            $scope.settings = SettingsService.settings();
            $scope.loadFeed();
        }

        $scope.loadFeed = function () {
            FeedService.parseFeed($scope.settings.feedUrl).then(function (res) {
                $scope.title = res.data.responseData.feed.title;
                $scope.feeds = res.data.responseData.feed.entries.splice(0, $scope.settings.numOfEntries);
            });
        }
    }];

var SettingsCtrl = ['$scope', '$window', 'SettingsService', 'Settings', 'WixService',
    function ($scope, $window, SettingsService, Settings, WixService) {
        $scope.init = function () {
            WixService.initialize();
            $scope.settings = SettingsService.settings();
            $scope.applySettings();
        }

        $scope.applySettings = function() {
            $scope.$watch('settings.numOfEntries',function(val,old){
                $scope.settings.numOfEntries = parseInt(val);
                if (old && val !== old) {
                    $scope.store();
                }
            });
        }

        $scope.connect = function(shouldConnect) {
            $scope.settings.connected = shouldConnect;
            $scope.store();
        }

        $scope.store = function() {
            var compId = WixService.getOrigCompId();
            Settings.save(JSON.stringify({compId: compId, settings: JSON.stringify($scope.settings)}), function success() {
                WixService.refreshAppByCompIds(compId);
            }, function err() {});
        }
    }];
var app = angular.module('rss', ['rss.controllers', 'rss.services']);
var services = angular.module('rss.services', ['ngResource']);

services.factory('FeedService', ['$http', function($http){
    return {
        parseFeed : function(url){
            return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
        }
    }
}]);

services.factory('Settings', ['$resource', '$location', function($resource, $location) {
    return $resource('/app/settingsupdate?instance=' + ($location.search()).instance,
        {headers: {'Content-Type': 'application/json'}},
        {}
    );
}]);

services.factory("SettingsService", ['$window', function($window) {
    return {
        settings : function() {
            var settings = $.extend(
                {'numOfEntries': '4',
                      'feedUrl': 'http://rss.cnn.com/rss/edition.rss',
                      'connected' : false
                },
                $window.settings);
            return settings;
        }
    };
}]);

services.factory('WixService', function() {
    return {
        initialize : function() {
            return Wix.UI.initialize();
        },
        getOrigCompId : function() {
            return Wix.Utils.getOrigCompId();
        },
        refreshAppByCompIds : function(compId) {
            return Wix.Settings.refreshAppByCompIds(compId);
        }
    }
});