(function() {
  'use strict';

  angular
    .module('myDirectives')
    .directive('toggleState', toggle);



  /** @ngInject */
  function toggle(lodash, $log) {
    var isBoolean =  lodash.isBoolean;
    var reduce = lodash.reduce;
    var split = lodash.split;

    function toggleBool(obj, nextProp) {
      // toggles bool property when is passes the iteer check
      // else returns new value for next iteer
      if (isBoolean(obj[nextProp])) {
        obj[nextProp] = !obj[nextProp];
        return false;
      }
      return obj[nextProp];
    }

    function toggleStateOnObject(initialState, string) {
      var props = split(string, '.');
      if (props.length <= 1) {
        // make sure u use vm
        $log.warn('not using vm');

      }
      reduce(props, toggleBool, initialState);
    }

    return {
      restrict: 'A',
      link: linkFunc
    };

    function linkFunc(scope, el, attr) {
      el.on('click', function () {
        scope.$apply(function () {
          toggleStateOnObject(scope, attr.toggleState);
        });
      });
    }
  }

})();
