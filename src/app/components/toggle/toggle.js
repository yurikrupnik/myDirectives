(function() {
  'use strict';

  angular
    .module('myDirectives')
    .directive('toggleState', toggleState);

  /** @ngInject */
  function toggleState() {
    return {
      restrict: 'A',
      link: linkFunc
    };

    function linkFunc(scope, el, attr) {
      // vm.someProperty = false/true - vm is not a must, any name will work
      var splits = attr.toggleState.split('.');
      var obj = splits[0]; // vm part
      var prop = splits[1]; // property part

      function toggleBool() {
        scope[obj][prop] = !scope[obj][prop];
      }

      el.on('click', function () {
        scope.$apply(toggleBool);
      });
    }
  }

})();
