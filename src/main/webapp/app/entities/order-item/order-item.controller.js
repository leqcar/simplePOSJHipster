(function() {
    'use strict';

    angular
        .module('simplePosjHipsterApp')
        .controller('OrderItemController', OrderItemController);

    OrderItemController.$inject = ['OrderItem'];

    function OrderItemController(OrderItem) {

        var vm = this;

        vm.orderItems = [];

        loadAll();

        function loadAll() {
            OrderItem.query(function(result) {
                vm.orderItems = result;
                vm.searchQuery = null;
            });
        }
    }
})();
