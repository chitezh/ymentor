'use strict';

var app = angular.module('pairToLearnApp', ['ngRoute', 'ngMessages', 'ngFileUpload', 'angular-loading-bar', 'timer', 'ui.timepicker']);

app.config(['$routeProvider', '$httpProvider', '$locationProvider', 'cfpLoadingBarProvider', function($routeProvider, $httpProvider, $locationProvider, cfpLoadingBarProvider) {

  $routeProvider
    .when('/home', {
      templateUrl: 'app/views/home.view.html',
      controller: 'HomeCtrl'
    })
    .when('/wallet/success', {
      templateUrl: 'app/views/success.view.html',
      controller: 'HomeCtrl',
      data: {
        requiresLogin: true
      }
    })
    .when('/wallet/fail', {
      templateUrl: 'app/views/fail.view.html',
      controller: 'HomeCtrl',
      data: {
        requiresLogin: true
      }
    })
    .when('/user/:id', {
      templateUrl: 'app/views/Userpage.view.html',
      controller: 'CraftCtrl',
      data: {
        requiresLogin: true
      }
    })
    .when('/crafts', {
      templateUrl: 'app/views/crafts.view.html',
      controller: 'CraftCtrl'
    })
    .when('/user/:id/dashboard', {
      templateUrl: 'app/views/profile.view.html',
      controller: 'CraftCtrl',
      data: {
        requiresLogin: true
      }
    })
    .when('/wallet/user/:id', {
      templateUrl: 'app/views/wallet.view.html',
      controller: 'WalletCtrl',
      data: {
        requiresLogin: true
      }
    })
    .when('/user/:id/craft/:craftId', {
      templateUrl: 'app/views/Expertpage.view.html',
      controller: 'ExpertCtrl',
      data: {
        requiresLogin: true
      }
    })
    .when('/login', {
      templateUrl: 'app/views/login.view.html',
      controller: 'SignCtrl'
    })
    .when('/signup', {
      templateUrl: 'app/views/signup.view.html',
      controller: 'SignCtrl'
    })
    .when('/edit/user/:id', {
      templateUrl: 'app/views/Editprofile.view.html',
      controller: 'NavCtrl',
      data: {
        requiresLogin: true
      }
    })
    .when('/user/:id/apply/expert', {
      templateUrl: 'app/views/apply.expert.view.html',
      controller: 'CraftCtrl',
      data: {
        requiresLogin: true
      }
    })
    .when('/post-craft', {
      templateUrl: 'app/views/admin.view.html',
      controller: 'CRUDCraftCtrl',
      data: {
        requiresLogin: true
      }
    })
    .when('/admin/crafts', {
      templateUrl: 'app/views/admincraft.view.html',
      controller: 'CraftCtrl',
      data: {
        requiresLogin: true
      }
    })
    .when('/edit/craft/:id', {
      templateUrl: 'app/views/EditCraft.view.html',
      controller: 'CRUDCraftCtrl',
      data: {
        requiresLogin: true
      }
    })
    .when('/bookSession', {
      templateUrl: 'app/views/Booksession.view.html',
      controller: 'WalletCtrl',
      data: {
        requiresLogin: true
      }
    })
    .when('/mycrafts', {
      templateUrl: 'app/views/mycrafts.view.html',
      controller: 'myCraftsCtrl',
      data: {
        requiresLogin: true
      }
    })
    .when('/user/pair/:sessionId', {
      templateUrl: 'app/views/pair.view.html',
      controller: 'PairCtrl',
      data: {
        requiresLogin: true
      }
    })
    .otherwise({
      redirectTo: '/home'
    });

  // $locationProvider.html5Mode(true);// Clean Url
  //circle loading false
  cfpLoadingBarProvider.includeSpinner = false;

  $httpProvider.interceptors.push(['$q', '$location', '$window', '$rootScope',
    function($q, $location, $window, $rootScope) {
      return {
        'request': function(config) {
          var querytoken = $location.search().token;
          $location.search('token', null);
          // $location.search('userId', null);
          if (!$window.sessionStorage.token && querytoken) {
            Materialize.toast('You are signed in!', 4000);
            $window.sessionStorage.token = querytoken;
            var parseJwt = function(token) {
              var base64Url = token.split('.')[1];
              var base64 = base64Url.replace('-', '+').replace('_', '/');
              return JSON.parse($window.atob(base64));
            };
            var decodedToken = parseJwt(querytoken);
            $window.sessionStorage.user = decodedToken.user._id;
            $rootScope.decodedToken = decodedToken;
          }
          if ($window.sessionStorage.token || querytoken) {
            config.headers.Authorization = $window.sessionStorage.token || querytoken;
            $rootScope.isLoggedIn = true;
          } else {
            $rootScope.isLoggedIn = false;
          }
          return config;
        },
        // optional method
        'response': function(response) {
          return response;
        },

        'responseError': function(rejection) {
          console.log('response error', rejection);
          if (rejection.status === 401 || rejection.status === 403) {
            $location.url('/login');
          }
          return $q.reject(rejection);
        }
      };
    }
  ]);
}])

.run(['$rootScope', '$location', '$window', function($rootScope, $location, $window) {
  $rootScope.$on("$routeChangeStart", function(event, to) {
    if ($window.sessionStorage.refUrl && $window.sessionStorage.token) {
      var ref = $window.sessionStorage.refUrl;
      $window.sessionStorage.removeItem('refUrl');
      $location.url(ref);
    }
    if (to.data && to.data.requiresLogin) {
      if (!($window.sessionStorage.token || $location.search().token)) {
        event.preventDefault();
        $window.sessionStorage.refUrl = $location.url();
        $location.url('/login'); //redirect to login if user is not authenitcated
      }
    }
  });
}]);
