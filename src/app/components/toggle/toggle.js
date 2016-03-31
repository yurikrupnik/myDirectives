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

    function toggleBool(obj, currentValue) {
      // toggles bool property when the val of currentVal with the reduced object, is bool^.
      var nextKey = trim(currentValue);
      if (isBoolean(obj[nextKey])) {
        obj[nextKey] = !obj[nextKey];
      }
      return obj[nextKey];
    }

    function splitByDot(string) {
      return split(string, '.');
    }
    function toggleStateOnObject(initialState, stringOfProps) {
      var props = splitByDot(stringOfProps);
      if (props.length <= 1) {
        // make sure u use vm, props.length === 0 is when u work on $scope
        $log.warn('not using vm');
      }
      reduce(props, toggleBool, initialState);
      // check for bool prop on iter on chained object
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
