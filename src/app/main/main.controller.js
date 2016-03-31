(function() {
  'use strict';

  angular
    .module('myDirectives')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($http) {
    var vm = this;

    vm.gridOptions = { enableFiltering: true, enableCellEdit: true };
    vm.gridOptions.enableCellEditOnFocus = true;

    $http.get('https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/500_complex.json')
      .success(function(data) {
        vm.gridOptions.data = data;
      });


    vm.gridParams = {
      enableCellEditing: true
    };
    vm.shit = false;
    //vm.shit.shown = true;
    //$scope.shown = true;
  }
})();

