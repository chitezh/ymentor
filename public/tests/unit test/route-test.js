describe('Routes test', function() {
  beforeEach(module('Andejobs'));
    
    var $location, $route, $rootScope;
        
    beforeEach(inject(function(_$location_, _$route_, _$rootScope_){
        $location = _$location_;
        $route = _$route_;
        $rootScope = _$rootScope_;
    }));
    beforeEach(inject(function($httpBackend){
      $httpBackend.expectGET('views/home.view.html').respond(200, 'main HTML');
    }));

    it('should load the home page on successful load of '/'', function(){
      expect($location.path()).toBe('');
      $location.path('/');
      $rootScope.$digest();
      expect($location.path()).toBe('/');
      expect($route.current.controller).toBe('HomeCtrl');
    });

    it('should redirect to home view on non-existent route', function(){
      expect($location.path()).toBe('');
      $location.path('/non-existent-route');
      $rootScope.$digest();
      expect($location.path()).toBe('/');
      expect($route.current.controller).toBe('HomeCtrl');
    });
  });