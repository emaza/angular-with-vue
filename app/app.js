'use strict';
// Register our component
Vue.component('counter', {
  props: ['initialCountValue'],
  template: '<div id="counter-component">' +
    '<button v-on:click="decrement" type="button">-</button>' +
    '<input type="number" v-model="countValue" v-on:input="countUpdated" />' +
    '<button v-on:click="increment" type="button">+</button>' +
    '</div>',
  data: function () {
    return {
      countValue: this.initialCountValue
    }
  },
  watch: {
    initialCountValue: function (update) {
      this.countValue = update;
      this.countUpdated();
    }
  },
  methods: {
    increment: function () {
      this.countValue += 1;
      this.$emit('increment', this.countValue);
    },
    decrement: function () {
      this.countValue -= 1;
      this.$emit('decrement', this.countValue);
    },
    countUpdated: function () {
      this.$emit('countupdated', this.countValue);
    }
  }
});
// Declare app level module which depends on views, and core components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]).directive('counterWrapper', function ($timeout) {
  return {
    restrict: 'A',
    link: function (scope, elem) {
      // Set starting simple-counter value
      scope.countValue = 0;

      // Our Vue root instance
      scope.vue = new Vue({
        el: elem[0].querySelector('[ng-non-bindable]'),
        data: {
          initialCountValue: scope.countValue
        },
        methods: {
          updateCountValue: function (countValue) {
            scope.$apply(function () {
              scope.countValue = countValue;
            });
          }
        }
      });

      // Send updates from angular to vue component
      scope.incrementCount = function () {
        scope.vue.initialCountValue = scope.countValue + 10;
      }

      scope.decrementCount = function () {
        scope.vue.initialCountValue = scope.countValue - 10;
      }
    }
  }
});



// // Create anglar module + directive wrapper
// angular.module('app', [])
//   .directive('counterWrapper', function ($timeout) {
//     return {
//       restrict: 'A',
//       link: function (scope, elem) {
//         // Set starting simple-counter value
//         scope.countValue = 0;

//         // Our Vue root instance
//         scope.vue = new Vue({
//           el: elem[0].querySelector('[ng-non-bindable]'),
//           data: {
//             initialCountValue: scope.countValue
//           },
//           methods: {
//             updateCountValue: function (countValue) {
//               scope.$apply(function () {
//                 scope.countValue = countValue;
//               });
//             }
//           }
//         });

//         // Send updates from angular to vue component
//         scope.incrementCount = function () {
//           scope.vue.initialCountValue = scope.countValue + 10;
//         }

//         scope.decrementCount = function () {
//           scope.vue.initialCountValue = scope.countValue - 10;
//         }
//       }
//     }
//   });

// Bootstrap application
// angular.bootstrap(document.body, ['myApp']);

