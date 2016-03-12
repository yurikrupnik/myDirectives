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
    var trim = lodash.trim;

    function splitByDot(string) {
      return split(string, '.');
    }
    function toggleBool(obj, currentValue) {
      // toggles bool property when is passes the iteer check
      // else returns new value for next iteer
      var nextProp = trim(currentValue);
      if (isBoolean(obj[nextProp])) {
        obj[nextProp] = !obj[nextProp]; // this line is the brain of the directive = all that code for dynamic toggle on click directive
        return false;
      }
      return obj[nextProp];
    }

    function toggleStateOnObject(initialState, stringOfProps) {
      var props = splitByDot(stringOfProps);
      if (props.length <= 1) {
        // make sure u use vm
        $log.warn('not using vm');

      }
      // todo name it, make a func for it
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
