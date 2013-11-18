angular.module('rss.controllers', []);

var WidgetCtrl = ['$scope', '$window', 'SettingsService', 'FeedService',
    function ($scope, $window, SettingsService, FeedService) {
        $scope.init = function () {
            $scope.settings = SettingsService.settings($window);
            $scope.loadFeed();
        }

        $scope.loadFeed = function () {
            FeedService.parseFeed($scope.settings.feedUrl).then(function (res) {
                $scope.title = res.data.responseData.feed.title;
                $scope.feeds = res.data.responseData.feed.entries.splice(0, $scope.settings.numOfEntries);
            });
        }
    }];

var SettingsCtrl = ['$scope', '$window', 'SettingsService', 'Settings', 'WixService', 'FeedService',
    function ($scope, $window, SettingsService, Settings, WixService, FeedService) {
        $scope.init = function () {
            WixService.initialize();
            $scope.settings = SettingsService.settings($window);

            $scope.applySettings();

            if ($scope.settings.connected) {
                FeedService.parseFeed($scope.settings.feedUrl).then(function (res) {
                    $scope.feed = res.data.responseData.feed;
                });
            }
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