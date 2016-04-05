(function () {
  'use strict';

  angular
    .module('myDirectives')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($http, $q) {
    var vm = this;

    vm.gridOptions = {enableFiltering: true, enableCellEdit: true};
    vm.gridOptions.enableCellEditOnFocus = true;


    // http already returns promise
    var currentTime = Date.now();
    var httpPromise = $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json');
    httpPromise
      .then(function (fullResponse) {
        // var currentTimeOne = Date.now();
        vm.gridOptions.data = fullResponse.data;
        console.debug('fullResponse', fullResponse);
        var currentTimeTwo = Date.now();
        // console.log('currentTimeOne', currentTimeOne);
        // console.log('currentTimeTwo', currentTimeTwo);

        return fullResponse;
      }, function (error) {
        console.error('error', error);
        return {name: 'yuri'};
      })
      .then(function (something) {
        console.log('something', something);

      });

    // creating deferred object
    var manualDefer = $q.defer();
    console.log('manualDefer', manualDefer);


    // success callback
    function success(data) {
      console.log('data passed to success function', data);

    }

    // returning promise
    var promise = manualDefer.promise;

    promise.then(success);

    manualDefer.resolve({name:"yuri"});
    // vm.gridParams = {
    //   enableCellEditing: true
    // };
    // vm.shit = false;
    //vm.shit.shown = true;
    //$scope.shown = true;
  }
})();

