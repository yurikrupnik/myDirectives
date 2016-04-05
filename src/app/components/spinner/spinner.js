(function () {
  'use strict';

  angular
    .module('my.spinner',[])
    .directive('spinner', spinner)
    .value('ngHide', 'ng-hide')
    .value('spinnerEvents', [
      // todo create provider to emit new spinner events
      // eventName, jquery action to do on the dom on eventName, action name in the controller
      ['spinner.show', 'removeClass', 'show'],
      ['spinner.hide', 'addClass', 'hide']
    ])
    .service('spinnerService', spinnerService);

  /** @ngInject */
  function spinner(ngHide, spinnerEvents, lodash) {
    var forEach = lodash.forEach;

    function compile(tElement) {
      // adds built in angular class for hiding element on compile
      tElement.addClass(ngHide);
      // return link function
      return function (scope, element) {
        // register on the scope dynamic events made from your spinnerEvents array
        // forEach(spinnerEvents, function (value){
        //   var event = value[0];
        //   var action = value[1];
        //   scope.$on(event, function (e) {
        //     element[action](ngHide);
        //   });
        // });


        // same as that part - but not dynamic
        scope.$on('spinner.show', function (e) {
          element.removeClass(ngHide);
        });

        scope.$on('spinner.hide', function (e) {
          element.addClass(ngHide);
        });
      }
    }

    return {
      restrict: 'E',
      template: '<div class="spinner-spinner"><i class="fa fa-spinner fa-spin fa-4x"></i></div>' +
                '<div class="spinner-modal modal-backdrop fade in"></div>',
      compile: compile
    };
  }

  /** @ngInject */
  function spinnerService($rootScope, spinnerEvents, lodash) {
    function splitByDon(string) {
      return lodash.split(string, '.');
    }

    function getControllerAction(string) {
      return splitByDon(string)[1];
    }

    lodash.reduce(spinnerEvents, function (currentValue, newValue) {
      var eventName = newValue[0];
      var controllerAction = getControllerAction(eventName);
      // or that for
      // var controllerAction = newValue[2];
      currentValue[controllerAction] = function () {
        $rootScope.$broadcast(eventName);
      };
      return currentValue;
    }, this);

    // instead can use that
    // function create() {
    //   var ob = {};
    //
    //   lodash.forEach(spinnerEvents, function (value) {
    //     var evenName = value[0];
    //     var action = value[2];
    //     ob[action] = function () {
    //       $rootScope.$broadcast(evenName);
    //     };
    //   });
    //
    //   return ob;
    // }
    //
    // return create();


    // or that
    // this.show = function () {
    //   $rootScope.$broadcast('spinner-show');
    // };
    //
    // this.hide = function () {
    //   $rootScope.$broadcast('spinner-hide');
    // };
    // return this;
  }
})();
