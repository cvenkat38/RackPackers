 var app = angular.module('myApp', ['ngRoute', 'ngResource', 'ui.bootstrap', 'ngCookies']);
 var SHOW_LOADER = true;
 var timedOut = false;
 var LANG = "";
 var pendingPromisses = 0;
 var auth2;
 var googleUser;

 app.config(function($routeProvider) {
     $routeProvider
         .when('/', {
             templateUrl: 'html/landing.html',
             controller: 'landingCtrl'
         })
         .when('/gallery', {
             templateUrl: 'html/gallery.html',
             controller: 'galleryCtrl'
         })
         .when('/blog', {
             templateUrl: 'html/blog.html',
             controller: 'blogCtrl'
         })
         .when('/view/blog/:blogId', {
             templateUrl: 'html/viewBlog.html',
             controller: 'viewBlogCtrl'
         })
         .when('/contact', {
             templateUrl: 'html/contact.html',
             controller: 'contactCtrl'
         })
         .when('/trek/details/:trekID', {
             templateUrl: 'html/trekDetails.html',
             controller: 'trekDetailsCtrl'
         }).when('/trek/list', {
             templateUrl: 'html/eventList.html',
             controller: 'eventListCtrl'
         })
         .when('/member/register', {
             templateUrl: 'html/register.html',
             controller: 'registerCtrl'
         })
         .when('/member/home', {
             templateUrl: 'html/memberHome.html',
             controller: 'memberCtrl'
         });
 });
 app.run(function($rootScope, $location, $http) {
     $rootScope.$watch(
         function() {
             return pendingPromisses > 0;
         },
         function(loading) {
             $rootScope.loading = loading && SHOW_LOADER;
         }
     );

     $rootScope.$on("$routeChangeStart", function(createEvent, next, current) {
         pendingPromisses++;
         $('.modal-backdrop').remove();
         $('body').css('overflow', 'auto');
     });

     $rootScope.$on('$routeChangeSuccess', function(createEvent, next, current) {
         window.scrollTo(0, 0);
         pendingPromisses--;
         $rootScope.location = next.$$route.originalPath;
     });
     $rootScope.$on('$locationChangeSuccess', function() {

     });
 });
 app.controller('mainController', function($scope, $rootScope, $window, $document, serviceFactory, $resource, $q) {
     $scope.scrollY = 0;
     $scope.data = {};
     $rootScope.member = {};
     $document.on('scroll', function() {
         $scope.scrollY = $window.scrollY;
         if (!$scope.$$phase)
             $scope.$apply();
     });
     $scope.navigateMember = function(){
       if($rootScope.member.id && $rootScope.isSigned){
         window.location.href="#/member/home";
       }else{
         window.location.href="#/member/register";
       }
     };
 });
 app.controller('blogCtrl', function($scope, $window, $document) {
     $scope.data = {};
 });
 app.controller('viewBlogCtrl', function($scope, $window, $document) {});
 app.controller('createEventCtrl', function($scope, $window, $document, serviceFactory, $resource) {

 });
