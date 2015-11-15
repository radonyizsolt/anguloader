(function () {

    angular.module('anguloader', ['ui.bootstrap.modal'])
        .value('defaultLoaderSpinner', '<i class="fa fa-spinner fa-spin fa-5x anguloader-icon"></i>')

    .directive('anguloader', ['defaultLoaderSpinner', function (defaultLoaderSpinner) {
            return {
                restrict: 'AEC',
                template: '<div ng-show="anguloader.show" class"anguloader"></div>',
                replace: true,
                scope: {
                    anguloaderBackdrop: "=",
                },
                scope: true,
                link: function (scope, element, attrs, ctrl) {
                    var backdrop = "true";
                    element.addClass("anguloader");
                    if (typeof (attrs.anguloaderBackdrop) != 'undefined') {
                        backdrop = attrs.anguloaderBackdrop;
                    }
                    if (backdrop == 'true') {
                        element.addClass("anguloader-backdrop");
                    }
                    element.html(element.html() || defaultLoaderSpinner);
                }
            };
        }])
        .factory('httpInterceptor', ['$q', '$rootScope', function ($q, $rootScope) {
            var loadingCount = 0;
            return {
                request: function (config) {
                    if (++loadingCount === 1) $rootScope.$broadcast('loading:progress');
                    return config;
                },
                response: function (response) {
                    if (--loadingCount === 0) $rootScope.$broadcast('loading:finish');
                    return response;
                },
                responseError: function (rejection) {
                    if (--loadingCount === 0) $rootScope.$broadcast('loading:finish');
                    return $q.reject(rejection);
                }
            };
        }])
        .config(['$httpProvider', function ($httpProvider, $http) {
            $httpProvider.interceptors.push('httpInterceptor');
        }])
        .service('anguloaderService', function ($rootScope, $timeout) {
            return {
                show: function () {
                    $rootScope.anguloader = {
                        show: true
                    };
                    $timeout(function () {
                        $rootScope.anguloader = {
                            show: false
                        };
                    }, 5000);
                },
                hide: function () {
                    $rootScope.anguloader = {
                        show: false
                    };
                }
            }
        }).run(['$rootScope', 'anguloaderService', function ($rootScope, anguloaderService) {
            $rootScope.$on('loading:progress', function () {
                anguloaderService.show();
            });

            $rootScope.$on('loading:finish', function () {
                anguloaderService.hide();
            });
        }]);
}());