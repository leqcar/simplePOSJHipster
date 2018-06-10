(function() {
    'use strict';

    angular
        .module('simplePosjHipsterApp')
        .controller('OrderEntryController', OrderEntryController);

    OrderEntryController.$inject = ['OrderEntry'];

    function OrderEntryController(OrderEntry) {

        var vm = this;

        vm.orderEntries = [];

        loadAll();

        function loadAll() {
            OrderEntry.query(function(result) {
                vm.orderEntries = result;
                vm.searchQuery = null;
            });
        }
    }
})();
