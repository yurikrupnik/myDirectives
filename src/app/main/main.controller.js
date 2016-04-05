(function () {
  'use strict';

  angular
    .module('myDirectives')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($http, $q, spinnerService, $scope, $rootScope) {
    var vm = this;

    console.log('spinnerService', spinnerService);

    spinnerService.show();
    // spinnerService.hide();
    // spinnerService.show();
    // $scope.$emit('spinner-off');
    // $scope.$emit('spinner-on');
    // $rootScope.$broadcast('spinner-off');
    // $rootScope.$emit('spinner-on');
    //
    // $scope.$broadcast('spinner-off'); // fails here
    //
    // spinnerService.hide();

    vm.gridOptions = {enableFiltering: true, enableCellEdit: true};
    vm.gridOptions.enableCellEditOnFocus = true;


    // http already returns promise
    // var currentTime = Date.now();
    // spinnerService.show();
    var httpPromise = $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json');
    httpPromise
      .then(function (fullResponse) {
        vm.gridOptions.data = fullResponse.data;
        return fullResponse;
      }, function (error) {
        console.error('error', error);
        return {name: 'yuri'};
      })
      .then(function (something) {
        // console.log('something', something);
        return something;
      })
      .then(function (value) {
        // creating deferred object
        // var manualDefer = $q.defer();
        // // success callback
        // var success = function(data) {
        //   console.log('data passed to success function', data);
        // }.bind(value);
        //
        // // success.bind();
        //
        // // returning promise
        // var promise = manualDefer.promise;
        //
        // promise.then(success);
        //
        // manualDefer.resolve({name:"yuri"});
      })
      .then(function (data) {

      });
  }
})();

