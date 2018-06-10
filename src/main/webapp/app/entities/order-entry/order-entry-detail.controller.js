(function() {
    'use strict';

    angular
        .module('simplePosjHipsterApp')
        .controller('OrderEntryDetailController', OrderEntryDetailController);

    OrderEntryDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'OrderEntry', 'Customer', 'OrderItem'];

    function OrderEntryDetailController($scope, $rootScope, $stateParams, previousState, entity, OrderEntry, Customer, OrderItem) {
        var vm = this;

        vm.orderEntry = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('simplePosjHipsterApp:orderEntryUpdate', function(event, result) {
            vm.orderEntry = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
