(function() {
    'use strict';

    angular
        .module('simplePosjHipsterApp')
        .controller('ServiceOrderController', ServiceOrderController);

    ServiceOrderController.$inject = ['OrderItem'];

    function ServiceOrderController(OrderItem) {

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
