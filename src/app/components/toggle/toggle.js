(function() {
  'use strict';

  angular
    .module('myDirectives')
    .service('toggleService', function (lodash, $log) {
      var isBoolean = lodash.isBoolean;
      var reduce = lodash.reduce;
      var split = lodash.split;
      var trim = lodash.trim;

      function splitByDot(string) {
        return split(string, '.');
      }

      // reduce iters
      function toggleBool(obj, currentValue) {
        // toggles bool property when the val of currentVal with the reduced object, is bool^.
        var nextKey = trim(currentValue);
        var isValueBoolean = isBoolean(obj[nextKey]);
        if (isValueBoolean) {
          obj[nextKey] = !obj[nextKey];
        }
        return obj[nextKey];
      }

      // method used in link function
      this.toggleStateOnObject = function(initialState, stringOfProps) {
        var props = splitByDot(stringOfProps);
        if (props.length <= 1) {
          // make sure u use vm, props.length === 0 is when u work on $scope
          $log.warn('not using vm');
        }
        reduce(props, toggleBool, initialState);
      };

      // method used in link function
      // this.angularApplayUtilOnDom = function(object, attributes) {
      //   object.$apply(function () {
      //     toggleStateOnObject(object, attributes);
      //   });
      // }
    })
    .directive('toggleState', toggle);

  /** @ngInject */
  function toggle(toggleService) {
    return {
      restrict: 'A',
      link: linkFunc
    };

    function linkFunc(scope, el, attr) {
      el.on('click', function () {
        scope.$apply(function () {
          toggleService.toggleStateOnObject(scope, attr.toggleState)
        })
      });
    }
  }

})();
