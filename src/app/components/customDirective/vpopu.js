(function() {
  'use strict';

  angular
    .module('myDirectives')
    .directive('dynamic', dynamic);

  /** @ngInject */
  function dynamic($compile, $timeout) {
    return {
      restrict: 'A',
      link: linkFunc,
      //priority: 10,
      //terminal: false
    };

    function linkFunc(scope, el, attr) {
        //console.log('scope', scope.main.gridParams.enableCellEditing);
        //console.log('scope', scope);

      //if(scope.main.gridParams.enableCellEditing) {
      el.attr('ui-grid-edit', '');
        //el.attr('ng-click', function () {
        //console.log('dsasdass')
        //$compile(el)(scope);
      //});
      //$timeout(function () {
      //  console.log('sssss');

        //$compile(el)(scope);
      //}, 2000);
      //  )
      //}

      //attr.$set('ui-grid-edit');
        //if(scope.gridParams.enableCellEditing) {
        //  console.log('it is trye and should add the directive');
        //
        //
        //  //attr.$set('boom-boom', true);
        //  //attr.$set('ui-grid-edit', true);
        //}
      //};
      //console.log('attr', attr);
      //attr.$addClass('shalom');
      //console.log('el', el);
      //el.addClass('yuri');
      //console.log('scope', scope);



      //console.log('attr.vpopu', attr.vpopu);
      //console.log('a', attr.anotherParam);
      //
      //var sj= 'anotherParam' in attr;
      //
      //console.log('sj', sj);
      //
      //attr.$observe('vpopu', function (val) {
      //  console.log('val', val);
      //});
    }
  }

})();
