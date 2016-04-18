describe('app', function() {

  var HomeController, scope, mock$mdDialog, location;

  mock$mdDialog =  {
    show : jasmine.createSpy(),
    hide : jasmine.createSpy()
    };

  location = {path: jasmine.createSpy('path')};


  beforeEach(module('app'), function($provide){
      $provide.factory('$mdDialog', mock$mdDialog);
  });

  beforeEach(inject(function ($rootScope, $controller) {
      scope = $rootScope.$new();
      HomeController = $controller("HomeController", {
          $scope: scope,
          $mdDialog: mock$mdDialog,
          $location: location,
      });
  }));

  describe('HomeController', function(){

    it('HomeController should exists', function() {
      //spec body
      expect(scope.loading).toEqual(true);
      expect(HomeController).toBeDefined();
    });

    it('openDialog should open dialog', function() {
      //spec body
      scope.openDialog();

      expect(mock$mdDialog.show).toHaveBeenCalled();
    });

    it('trigger locaton path on navigateTo with paramater', function () {
        scope.navigateTo(123);
        expect(location.path).toHaveBeenCalledWith('/topic/' + 123);
    });
  });
});
