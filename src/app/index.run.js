(function() {
  'use strict';

  angular
    .module('myDirectives')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
