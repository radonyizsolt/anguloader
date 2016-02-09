(function () {

    //Angular component which shows a loader screen in case of a pending Http Request.
    //Maintainer: Zsolt Rádonyi <<radonyi.zsolt@gmail.com>>

    angular.module('anguloader', [])
        .value('spinners', {
            "default": '<div class="spinner anguloader-icon anguloader-blob"><div class="spinner__item1"></div><div class="spinner__item2"></div><div class="spinner__item3"></div><div class="spinner__item4"></div></div>',
            "waveform": '<svg class="part anguloader-icon" x="0px" y="0px" viewBox="0 0 256 256" style="enable-background:new 0 0 256 256;" xml:space="preserve"><path class="svgpath" id="playload" d="M189.5,140.5c-6.6,29.1-32.6,50.9-63.7,50.9c-36.1,0-65.3-29.3-65.3-65.3c0,0,17,0,23.5,0c10.4,0,6.6-45.9,11-46c5.2-0.1,3.6,94.8,7.4,94.8c4.1,0,4.1-92.9,8.2-92.9c4.1,0,4.1,83,8.1,83c4.1,0,4.1-73.6,8.1-73.6c4.1,0,4.1,63.9,8.1,63.9c4.1,0,4.1-53.9,8.1-53.9c4.1,0,4.1,44.1,8.2,44.1c4.1,0,3.1-34.5,7.2-34.5c4.1,0,3.1,24.6,7.2,24.6c4.1,0,2.5-14.5,5.2-14.5c2.2,0,0.8,5.1,4.2,4.9c0.4,0,13.1,0,13.1,0c0-34.4-27.9-62.3-62.3-62.3c-27.4,0-50.7,17.7-59,42.3" /><path class="svgbg" d="M61,126c0,0,16.4,0,23,0c10.4,0,6.6-45.9,11-46c5.2-0.1,3.6,94.8,7.4,94.8c4.1,0,4.1-92.9,8.2-92.9c4.1,0,4.1,83,8.1,83c4.1,0,4.1-73.6,8.1-73.6c4.1,0,4.1,63.9,8.1,63.9c4.1,0,4.1-53.9,8.1-53.9c4.1,0,4.1,44.1,8.2,44.1c4.1,0,3.1-34.5,7.2-34.5c4.1,0,3.1,24.6,7.2,24.6c4.1,0,2.5-14.5,5.2-14.5c2.2,0,0.8,5.1,4.2,4.9c0.4,0,22.5,0,23,0" /></svg>',
            "cube": '<div class="cube-icon"><div class="thecube "><div class="cube c1"></div><div class="cube c2"></div><div class="cube c4"></div><div class="cube c3"></div></div></div>',
            "loading": '<div class="text-loader">Loading...</div>',
            "sphere": '<div class="sphere-loader"><div class="inner one"></div><div class="inner two"></div><div class="inner three"></div></div>',
            "square":'<div class="square-loader"><div class="square square--main"><div class="square square--mini"></div><div class="square square--mini"></div><div class="square square--mini"></div><div class="square square--mini"></div><div class="square square--mini"></div><div class="square square--mini"></div><div class="square square--mini"></div><div class="square square--mini"></div><div class="square square--mini"></div><div class="square square--mini"></div><div class="square square--mini"></div><div class="square square--mini"></div><div class="square square--mini"></div><div class="square square--mini"></div><div class="square square--mini"></div><div class="square square--mini"></div></div></div>'
        })
        .provider('anguloaderConfig', function anguloaderConfigProvider() {
            var settings = {
                config: {
                    backdrop: true,
                    loader: 'default'
                },
                blacklist: [],
            };

            this.setBlackList = function (userBlacklist) {
                settings.blacklist = userBlacklist;
            };

            this.setConfig = function (userConfig) {
                settings.config = angular.extend(settings.config, userConfig);
            };

            this.$get = [function () {
                return settings;
            }];
        })
        .directive('anguloader', ['anguloaderConfig', 'anguloaderSpinnerFactory', function (anguloaderConfig, anguloaderSpinnerFactory) {
            return {
                restrict: 'AE',
                template: '<div ng-show="anguloader.show" class="anguloader"></div>',
                replace: true,
                scope: true,
                link: function (scope, element, attrs, ctrl) {
                    backdrop = anguloaderConfig.config.backdrop;
                    if (backdrop) {
                        element.addClass("anguloader-backdrop");
                    }
                    element.html(element.html() || anguloaderSpinnerFactory.getSpinner(anguloaderConfig.config.loader));
                }
            };
        }])
        .factory('anguloaderHttpInterceptor', ['$q', '$rootScope', 'anguloaderConfig', function ($q, $rootScope, anguloaderConfig) {
            var loadingCount = 0;
            var blacklist = anguloaderConfig.blacklist;
            return {
                request: function (config) {
                    if (blacklist.indexOf(config.url) == -1) {
                        if (++loadingCount === 1) $rootScope.$broadcast('loading:progress');
                    }
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
        .factory('anguloaderSpinnerFactory', ['spinners', function (spinners) {
            return {
                getSpinner: function (name) {
                    switch (name) {
                    case 'default':
                        return spinners.default;
                        break;
                    case 'waveform':
                        return spinners.waveform;
                        break;
                    case 'cube':
                        return spinners.cube;
                        break;
                    case 'loading':
                        return spinners.loading;
                        break;
                    case 'sphere':
                        return spinners.sphere;
                        break;
                    case 'square':
                        return spinners.square;
                        break;
                    default:
                        return spinners.default;
                        break;
                    };
                }
            };
        }])
        .config(['$httpProvider', 'anguloaderConfigProvider', function ($httpProvider, anguloaderConfigProvider) {
            $httpProvider.interceptors.push('anguloaderHttpInterceptor');
        }])
        .service('anguloaderService', function ($rootScope, $timeout,anguloaderConfig) {
            return {
                show: function () {
                    $rootScope.anguloader = {
                        show: true
                    };
                    if(anguloaderConfig.config.timeout != 0){
                        $timeout(function () {
                            $rootScope.anguloader = {
                                show: false
                            };
                        }, anguloaderConfig.config.timeout || 5000);
                    }
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