(function() {
    'use strict';

    angular
        .module('simplePosjHipsterApp')
        .controller('OrderItemDetailController', OrderItemDetailController);

    OrderItemDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'OrderItem', 'OrderEntry', 'Product'];

    function OrderItemDetailController($scope, $rootScope, $stateParams, previousState, entity, OrderItem, OrderEntry, Product) {
        var vm = this;

        vm.orderItem = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('simplePosjHipsterApp:orderItemUpdate', function(event, result) {
            vm.orderItem = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
